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
        
        secure_routes = ['login', 'cadastro', 'admin', 'veiculo', 'pagamento']
        
        needs_https = clean_path in secure_routes
        is_https = request.is_secure()

        print(f"PORTARIA -> Path: {path} | HTTPS: {is_https} | Needs: {needs_https}")

        if needs_https and not is_https:
            response = redirect(f"https://localhost{path}")
            
            add_never_cache_headers(response)
            
            response['Vary'] = 'Upgrade-Insecure-Requests'
            return response

        # REGRA 2: Forçar volta ao HTTP na Home (Desafio de Desempenho do Sistema)
        if clean_path == "" and is_https:
            response = redirect(f"http://localhost/")
            add_never_cache_headers(response)
            response['Vary'] = 'Upgrade-Insecure-Requests'
            return response

        return self.get_response(request)