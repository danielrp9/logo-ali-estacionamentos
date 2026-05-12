"""
Logo Ali Estacionamentos - views.py (Versão Definitiva - Auditoria Integrada)
Author: Daniel Rodrigues Pereira | Year: 2026
Finalidade: Gerenciamento de rotas com travas de segurança e auditoria de API (N01.4).
"""
import stripe
from django.conf import settings 
from django.urls import reverse
from django.shortcuts import render, redirect, get_object_or_404
from django.utils import timezone
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from django.contrib.admin.models import LogEntry, ADDITION, CHANGE
from django.contrib.contenttypes.models import ContentType

# Importações para isenção de CSRF e decoradores
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, authentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

from .models import Veiculo
from .forms import VeiculoForm
from .serializers import VeiculoSerializer, UserSerializer, ClienteAuditoriaSerializer

Usuario = get_user_model()
stripe.api_key = settings.STRIPE_SECRET_KEY

# ==========================================
# UTILITÁRIOS DE AUDITORIA
# ==========================================

def registrar_log_auditoria(user, obj, acao, mensagem):
    """Grava ações da API na tabela de LogEntry do Django Admin para auditoria total."""
    LogEntry.objects.log_action(
        user_id=user.pk,
        content_type_id=ContentType.objects.get_for_model(obj).pk,
        object_id=obj.pk,
        object_repr=str(obj),
        action_flag=acao,
        change_message=mensagem
    )

# ==========================================
# VIEWS PARA A API (REACT)
# ==========================================

@method_decorator(csrf_exempt, name='dispatch')
class RegistrarUsuarioAPI(APIView):
    """View isenta de CSRF para permitir cadastro via React"""
    permission_classes = [permissions.AllowAny]
    authentication_classes = [] 

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"mensagem": "Conta criada com sucesso!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@method_decorator(csrf_exempt, name='dispatch')
class LoginUsuarioAPI(ObtainAuthToken):
    """Login via API retornando Token e Perfil do Usuário com validação de Staff"""
    authentication_classes = [] 

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, _ = Token.objects.get_or_create(user=user)
        
        return Response({
            'token': token.key, 
            'username': user.username, 
            'is_staff': user.is_staff or user.tipo_usuario == 'AD',
            'tipo_usuario': user.tipo_usuario,
            'nome': user.nome_completo
        })

class ListaClientesAPI(APIView):
    """Norma N01.4: Listagem detalhada e busca dinâmica por CPF para triagem"""
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.TokenAuthentication]

    def get(self, request):
        if request.user.tipo_usuario not in ['FU', 'AD']:
            return Response({"erro": "Acesso negado: Nível de permissão insuficiente."}, status=status.HTTP_403_FORBIDDEN)
        
        cpf_query = request.query_params.get('cpf', None)
        
        if cpf_query:
            clientes = Usuario.objects.filter(tipo_usuario='CL', cpf=cpf_query)
        else:
            clientes = Usuario.objects.filter(tipo_usuario='CL').order_by('nome_completo')
            
        serializer = ClienteAuditoriaSerializer(clientes, many=True)
        return Response(serializer.data)

class PromoverUsuarioAPI(APIView):
    """
    Permite APENAS ao Administrador promover usuários.
    Gera barreira de segurança contra escalonamento de privilégios de funcionários.
    """
    permission_classes = [permissions.IsAuthenticated] 
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, cpf):
        if request.user.tipo_usuario != 'AD' and not request.user.is_superuser:
            return Response({"erro": "Operação restrita ao Administrador do sistema."}, status=status.HTTP_403_FORBIDDEN)

        usuario_alvo = get_object_or_404(Usuario, cpf=cpf)
        novo_tipo = request.data.get('tipo_usuario')

        if novo_tipo not in ['CL', 'FU', 'AD']:
            return Response({"erro": "Tipo de usuário inválido"}, status=status.HTTP_400_BAD_REQUEST)

        usuario_alvo.tipo_usuario = novo_tipo
        
        if novo_tipo == 'AD':
            usuario_alvo.is_staff = True
        
        usuario_alvo.save()

        # Auditoria de Promoção
        msg = f"PROMOÇÃO: Usuário {usuario_alvo.username} alterado para {novo_tipo} por {request.user.username}"
        registrar_log_auditoria(request.user, usuario_alvo, CHANGE, msg)

        return Response({
            "mensagem": f"Usuário {usuario_alvo.nome_completo} atualizado para {novo_tipo}.",
            "tipo_atual": usuario_alvo.tipo_usuario
        })

class ListaVeiculosAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.TokenAuthentication]

    def get(self, request):
        if request.user.tipo_usuario in ['FU', 'AD']:
            veiculos = Veiculo.objects.filter(horario_saida__isnull=True).order_by('-horario_entrada')
        else:
            veiculos = Veiculo.objects.filter(usuario=request.user, horario_saida__isnull=True).order_by('-horario_entrada')
        serializer = VeiculoSerializer(veiculos, many=True)
        return Response(serializer.data)

class HistoricoVeiculosAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.TokenAuthentication]

    def get(self, request):
        if request.user.tipo_usuario in ['FU', 'AD']:
            veiculos = Veiculo.objects.all().order_by('-horario_entrada')
        else:
            veiculos = Veiculo.objects.filter(usuario=request.user).order_by('-horario_entrada')
        serializer = VeiculoSerializer(veiculos, many=True)
        return Response(serializer.data)

class AdicionarVeiculoAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.TokenAuthentication]

    def get(self, request):
        total_vagas = 120
        vagas_ocupadas = Veiculo.objects.filter(horario_saida__isnull=True).count()
        return Response({"disponiveis": total_vagas - vagas_ocupadas})

    def post(self, request):
        data = request.data.copy()
        
        # Auditoria de Placa duplicada no pátio
        placa_nova = data.get('placa', '').upper()
        if Veiculo.objects.filter(placa=placa_nova, horario_saida__isnull=True).exists():
            return Response({"erro": "Este veículo já possui uma entrada ativa."}, status=status.HTTP_400_BAD_REQUEST)

        # LÓGICA DE ATRIBUIÇÃO DE DONO
        if request.user.tipo_usuario in ['FU', 'AD']:
            cpf_cliente = data.get('usuario')
            if not cpf_cliente:
                return Response({"erro": "Funcionário deve vincular um CPF de cliente."}, status=status.HTTP_400_BAD_REQUEST)
            
            dono = get_object_or_404(Usuario, cpf=cpf_cliente)
            data['usuario'] = dono.cpf
        else:
            data['usuario'] = request.user.cpf

        serializer = VeiculoSerializer(data=data)
        if serializer.is_valid():
            # Salva o veículo e injeta o log de auditoria
            veiculo = serializer.save(criado_por=request.user)
            
            msg = f"REGISTRO DE ENTRADA: Placa {veiculo.placa} vinculada ao CPF {veiculo.usuario.cpf} por {request.user.username}"
            registrar_log_auditoria(request.user, veiculo, ADDITION, msg)
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CriarSessaoPagamentoAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, veiculo_id):
        veiculo = get_object_or_404(Veiculo, pk=veiculo_id, horario_saida__isnull=True)
        tempo = timezone.now() - veiculo.horario_entrada
        horas = max(1, tempo.total_seconds() / 3600)
        valor_centavos = int(float(round(horas * 5, 2)) * 100)
        try:

            # Ajuste removendo o :8000 de http://localhost:8000 e adicionando uma "/" entre o
            # sucesso?session_id ficando, sucesso/?session_id
            # Trocando para https tambem para persistir com ssl
            success_url = "https://localhost/sucesso/?session_id={CHECKOUT_SESSION_ID}&veiculo_id=" + str(veiculo.id)
            session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=[{'price_data': {'currency': 'brl', 'product_data': {'name': f'Saída - Placa {veiculo.placa}'}, 'unit_amount': valor_centavos}, 'quantity': 1}],
                mode='payment',
                success_url=success_url,
                cancel_url="https://localhost/dashboard/",
            )
            return Response({'url': session.url})
        except Exception as e:
            return Response({'erro': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ConfirmarSaidaAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, veiculo_id):
        veiculo = get_object_or_404(Veiculo, pk=veiculo_id)
        session_id = request.data.get('session_id')
        try:
            session = stripe.checkout.Session.retrieve(session_id)
            if session.payment_status == 'paid':
                veiculo.horario_saida = timezone.now()
                veiculo.save()
                
                # Auditoria de Saída
                valor = session.amount_total / 100
                msg = f"SAÍDA CONFIRMADA: Pago R$ {valor} via Stripe (Sessão: {session_id}). Liberado por {request.user.username}"
                registrar_log_auditoria(request.user, veiculo, CHANGE, msg)
                
                permanencia = veiculo.horario_saida - veiculo.horario_entrada
                horas = max(1, permanencia.total_seconds() / 3600)
                return Response({
                    'status': 'pago', 'id_transacao': session.id, 'placa': veiculo.placa, 'modelo': veiculo.modelo,
                    'entrada': veiculo.horario_entrada, 'saida': veiculo.horario_saida,
                    'permanencia': f"{int(horas)}h {int((horas % 1) * 60)}min", 'valor_total': valor,
                    'qrcode_token': f"LIBERAR-{veiculo.placa}-{veiculo.id}"
                })
        except Exception as e:
            return Response({'erro': str(e)}, status=status.HTTP_400_BAD_REQUEST)

# ==========================================
# FUNÇÕES DE TEMPLATE (TRADICIONAIS/V1)
# ==========================================

def calcular_valor(horario_entrada):
    tempo_estacionado = timezone.now() - horario_entrada
    horas = tempo_estacionado.total_seconds() / 3600
    return round(max(1, horas) * 5, 2)

@login_required
def adicionar_veiculo(request):
    total_vagas = 120
    vagas_ocupadas = Veiculo.objects.filter(horario_saida__isnull=True).count()
    if request.method == 'POST':
        form = VeiculoForm(request.POST)
        if form.is_valid():
            veiculo = form.save(commit=False)
            veiculo.usuario = request.user
            veiculo.save()
            return redirect('estacionamento:lista_veiculos')
    else:
        form = VeiculoForm()
    return render(request, 'estacionamento/adicionar.html', {'form': form, 'vagas_disponiveis': total_vagas - vagas_ocupadas})

@login_required
def lista_veiculos(request):
    if request.user.tipo_usuario in ['FU', 'AD']:
        v = Veiculo.objects.filter(horario_saida__isnull=True).order_by('-horario_entrada')
    else:
        v = Veiculo.objects.filter(usuario=request.user, horario_saida__isnull=True).order_by('-horario_entrada')
    return render(request, 'estacionamento/lista.html', {'veiculos_ativos': v})

@login_required
def historico_veiculos(request):
    if request.user.tipo_usuario in ['FU', 'AD']:
        v = Veiculo.objects.all().order_by('-horario_entrada')
    else:
        v = Veiculo.objects.filter(usuario=request.user).order_by('-horario_entrada')
    return render(request, 'estacionamento/historico.html', {'veiculos': v})

@login_required
def tela_pagamento(request, veiculo_id):
    veiculo = get_object_or_404(Veiculo, pk=veiculo_id)
    if request.method == 'POST':
        try:
            valor_str = request.POST.get('valor_total', '0').replace(',', '.')
            valor_centavos = int(float(valor_str) * 100)
            checkout_session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=[{'price_data': {'currency': 'brl', 'product_data': {'name': f'Saída - {veiculo.placa}'}, 'unit_amount': valor_centavos}, 'quantity': 1}],
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
    veiculo = get_object_or_404(Veiculo, pk=veiculo_id)
    session_id = request.GET.get('session_id')
    if session_id:
        try:
            session = stripe.checkout.Session.retrieve(session_id)
            if session.payment_status == 'paid':
                veiculo.horario_saida = timezone.now()
                veiculo.save()
                return render(request, 'estacionamento/confirmacao-saida.html', {'veiculo': veiculo, 'valor_pago': session.amount_total / 100})
        except Exception:
            pass
    return redirect('estacionamento:pagamento_concluido', veiculo_id=veiculo.id)

@login_required
def pagamento_concluido(request, veiculo_id):
    veiculo = get_object_or_404(Veiculo, id=veiculo_id)
    return render(request, 'estacionamento/pagamento_concluido.html', {'veiculo': veiculo})