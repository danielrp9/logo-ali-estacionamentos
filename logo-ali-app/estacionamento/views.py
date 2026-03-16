"""
Logo Ali Estacionamentos - views.py (Corrigido para Auditoria)
Author: Daniel Rodrigues Pereira | Year: 2026
"""
import stripe
from django.conf import settings 
from django.urls import reverse
from django.shortcuts import render, redirect, get_object_or_404
from django.utils import timezone
from django.contrib import messages
from django.contrib.auth.decorators import login_required

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

from .models import Veiculo
from .forms import VeiculoForm
from .serializers import VeiculoSerializer

stripe.api_key = settings.STRIPE_SECRET_KEY

# ==========================================
# VIEWS TRADICIONAIS (TEMPLATES)
# ==========================================

@login_required
def adicionar_veiculo(request):
    total_vagas = 120
    vagas_ocupadas = Veiculo.objects.filter(horario_saida__isnull=True).count()
    vagas_disponiveis = total_vagas - vagas_ocupadas
    
    if request.method == 'POST':
        form = VeiculoForm(request.POST)
        if form.is_valid():
            if vagas_ocupadas < total_vagas:
                veiculo = form.save(commit=False)
                veiculo.usuario = request.user
                veiculo.save()
                return redirect('estacionamento:lista_veiculos')
            else:
                messages.error(request, "Não há vagas disponíveis no momento.")
    else:
        form = VeiculoForm()
    
    context = {'form': form, 'vagas_disponiveis': vagas_disponiveis}
    return render(request, 'estacionamento/adicionar.html', context)

@login_required
def lista_veiculos(request):
    if request.user.is_staff:
        veiculos_ativos = Veiculo.objects.filter(horario_saida__isnull=True).order_by('-horario_entrada')
    else:
        veiculos_ativos = Veiculo.objects.filter(usuario=request.user, horario_saida__isnull=True).order_by('-horario_entrada')
    return render(request, 'estacionamento/lista.html', {'veiculos_ativos': veiculos_ativos})

@login_required
def historico_veiculos(request):
    if request.user.is_staff:
        veiculos = Veiculo.objects.all().order_by('-horario_entrada')
    else:
        veiculos = Veiculo.objects.filter(usuario=request.user).order_by('-horario_entrada')
    return render(request, 'estacionamento/historico.html', {'veiculos': veiculos})

def calcular_valor(horario_entrada):
    tempo_estacionado = timezone.now() - horario_entrada
    horas = tempo_estacionado.total_seconds() / 3600
    return round(max(1, horas) * 5, 2)

@login_required
def tela_pagamento(request, veiculo_id):
    stripe.api_key = settings.STRIPE_SECRET_KEY
    veiculo = get_object_or_404(Veiculo, pk=veiculo_id)
    if request.method == 'POST':
        try:
            valor_str = request.POST.get('valor_total', '0').replace(',', '.')
            valor_centavos = int(float(valor_str) * 100)
            checkout_session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=[{
                    'price_data': {
                        'currency': 'brl',
                        'product_data': {'name': f'Saída - {veiculo.placa}'},
                        'unit_amount': valor_centavos,
                    },
                    'quantity': 1,
                }],
                mode='payment',
                success_url=request.build_absolute_uri(reverse('estacionamento:registrar_saida', args=[veiculo_id])) + '?session_id={CHECKOUT_SESSION_ID}',
                cancel_url=request.build_absolute_uri('/'),
            )
            return redirect(checkout_session.url)
        except Exception as e:
            return render(request, 'estacionamento/erro_pagamento.html', {'erro': str(e)})
    
    valor_total = calcular_valor(veiculo.horario_entrada)
    context = {'veiculo': veiculo, 'valor_total': valor_total, 'horas_estacionado': round((timezone.now() - veiculo.horario_entrada).total_seconds() / 3600, 2)}
    return render(request, 'estacionamento/pagamento.html', context)

@login_required
def registrar_saida(request, veiculo_id):
    stripe.api_key = settings.STRIPE_SECRET_KEY
    veiculo = get_object_or_404(Veiculo, pk=veiculo_id)
    session_id = request.GET.get('session_id')
    try:
        if session_id:
            session = stripe.checkout.Session.retrieve(session_id)
            if session.payment_status == 'paid':
                veiculo.horario_saida = timezone.now()
                veiculo.save()
                return render(request, 'estacionamento/confirmacao-saida.html', {'veiculo': veiculo, 'valor_pago': session.amount_total / 100})
    except Exception as e:
        print(f"Erro: {e}")
    return redirect('estacionamento:pagamento_concluido', veiculo_id=veiculo.id)

@login_required
def pagamento_concluido(request, veiculo_id):
    veiculo = get_object_or_404(Veiculo, id=veiculo_id)
    return render(request, 'estacionamento/pagamento_concluido.html', {'veiculo': veiculo})


# ==========================================
# NOVAS VIEWS PARA A API (REACT)
# ==========================================

class LoginUsuarioAPI(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'username': user.username, 'is_staff': user.is_staff})

class ListaVeiculosAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        # Filtra apenas veículos no pátio (Ativos)
        if request.user.is_staff:
            veiculos = Veiculo.objects.filter(horario_saida__isnull=True).order_by('-horario_entrada')
        else:
            veiculos = Veiculo.objects.filter(usuario=request.user, horario_saida__isnull=True).order_by('-horario_entrada')
            
        serializer = VeiculoSerializer(veiculos, many=True)
        return Response(serializer.data)

class HistoricoVeiculosAPI(APIView):
    """Nova view para retornar TODOS os veículos (Ativos e Finalizados)"""
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        if request.user.is_staff:
            veiculos = Veiculo.objects.all().order_by('-horario_entrada')
        else:
            veiculos = Veiculo.objects.filter(usuario=request.user).order_by('-horario_entrada')
            
        serializer = VeiculoSerializer(veiculos, many=True)
        return Response(serializer.data)

class AdicionarVeiculoAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        total_vagas = 120
        vagas_ocupadas = Veiculo.objects.filter(horario_saida__isnull=True).count()
        return Response({"disponiveis": total_vagas - vagas_ocupadas})

    def post(self, request):
        placa_nova = request.data.get('placa', '').upper()
        if Veiculo.objects.filter(placa=placa_nova, horario_saida__isnull=True).exists():
            return Response({"erro": "Este veículo já possui uma entrada ativa no pátio."}, status=status.HTTP_400_BAD_REQUEST)

        if Veiculo.objects.filter(horario_saida__isnull=True).count() >= 120:
            return Response({"erro": "Vagas esgotadas"}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = VeiculoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(usuario=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CriarSessaoPagamentoAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, veiculo_id):
        stripe.api_key = settings.STRIPE_SECRET_KEY
        veiculo = get_object_or_404(Veiculo, pk=veiculo_id, horario_saida__isnull=True)

        tempo = timezone.now() - veiculo.horario_entrada
        horas = max(1, tempo.total_seconds() / 3600)
        valor_centavos = int(float(round(horas * 5, 2)) * 100)

        try:
            success_url = "http://localhost:5173/sucesso?session_id={CHECKOUT_SESSION_ID}&veiculo_id=" + str(veiculo.id)
            
            session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=[{
                    'price_data': {
                        'currency': 'brl',
                        'product_data': {'name': f'Saída - Placa {veiculo.placa}'},
                        'unit_amount': valor_centavos,
                    },
                    'quantity': 1,
                }],
                mode='payment',
                success_url=success_url,
                cancel_url="http://localhost:5173/dashboard",
            )
            return Response({'url': session.url})
        except Exception as e:
            return Response({'erro': str(e)}, status=status.HTTP_400_BAD_REQUEST)
            
class ConfirmarSaidaAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, veiculo_id):
        stripe.api_key = settings.STRIPE_SECRET_KEY
        veiculo = get_object_or_404(Veiculo, pk=veiculo_id)
        session_id = request.data.get('session_id')
        
        try:
            session = stripe.checkout.Session.retrieve(session_id)
            if session.payment_status == 'paid':
                veiculo.horario_saida = timezone.now()
                veiculo.save()

                permanencia = veiculo.horario_saida - veiculo.horario_entrada
                horas = max(1, permanencia.total_seconds() / 3600)
                
                return Response({
                    'status': 'pago',
                    'id_transacao': session.id,
                    'placa': veiculo.placa,
                    'modelo': veiculo.modelo,
                    'entrada': veiculo.horario_entrada,
                    'saida': veiculo.horario_saida,
                    'permanencia': f"{int(horas)}h {int((horas % 1) * 60)}min",
                    'valor_total': session.amount_total / 100,
                    'qrcode_token': f"LIBERAR-{veiculo.placa}-{veiculo.id}"
                })
        except Exception as e:
            return Response({'erro': str(e)}, status=status.HTTP_400_BAD_REQUEST)