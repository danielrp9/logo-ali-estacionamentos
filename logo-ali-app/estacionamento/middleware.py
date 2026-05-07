"""
LogoAli/Logo Ali - Parking Management System (Security Protocol Enforcer)
Author: Daniel Rodrigues Pereira | Year: 2026
Finalidade: Gerenciamento granular de SSL (HTTP/HTTPS) conforme Norma N08.6 da PSI.
"""

from django.shortcuts import redirect
from django.utils.cache import add_never_cache_headers

class ProtocolEnforcerMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        path = request.path
        clean_path = path.strip('/')
        
        # Lista de rotas que EXIGEM criptografia (Norma N08.6 da PSI)
        secure_routes = ['login', 'cadastro', 'admin', 'veiculo', 'pagamento']
        
        needs_https = clean_path in secure_routes
        is_https = request.is_secure()

        print(f"PORTARIA -> Path: {path} | HTTPS: {is_https} | Needs: {needs_https}")

        # REGRA 1: Forçar HTTPS em rotas sensíveis
        if needs_https and not is_https:
            response = redirect(f"https://localhost{path}")
            
            # BLOQUEIO DE CACHE: Obriga o navegador a reprocessar a requisição do zero
            add_never_cache_headers(response)
            
            # CABEÇALHO DE UPGRADE: Força a transição de protocolo no motor do browser
            response['Vary'] = 'Upgrade-Insecure-Requests'
            return response

        # REGRA 2: Forçar volta ao HTTP na Home (Desafio de Desempenho do Sistema)
        if clean_path == "" and is_https:
            response = redirect(f"http://localhost/")
            add_never_cache_headers(response)
            response['Vary'] = 'Upgrade-Insecure-Requests'
            return response

        return self.get_response(request)