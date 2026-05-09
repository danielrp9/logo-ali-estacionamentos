"""
LogoAli/Logo Ali - Parking Management System (Security Protocol Enforcer)
Author: Daniel Rodrigues Pereira | Year: 2026
Finalidade: Gerenciamento granular de SSL (HTTP/HTTPS) conforme Norma N08.6 da PSI.
"""
from django.http import HttpResponseRedirect

class ProtocolEnforcerMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        path = request.path
        clean_path = path.strip('/')
        
        secure_routes = ['login', 'cadastro', 'admin', 'veiculo', 'pagamento', 'dashboard', 'historico', 'adicionar']
        
        needs_https = any(clean_path.startswith(route) for route in secure_routes)
        is_https = request.is_secure()
        
        # Log de Auditoria para Terminal
        forwarded_proto = request.META.get('HTTP_X_FORWARDED_PROTO', 'undefined')
        print(f"PORTARIA -> Path: {path} | HTTPS: {is_https} | X-Forwarded-Proto: {forwarded_proto} | Needs HTTPS: {needs_https}")

        # REGRA 1: FORÇAR SALTO PARA HTTPS
        if needs_https and not is_https:
            target_url = request.build_absolute_uri(path).replace('http://', 'https://')
            response = HttpResponseRedirect(target_url)
            
            response['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0'
            response['Pragma'] = 'no-cache'
            response['Expires'] = '0'
            response['Vary'] = 'X-Forwarded-Proto, Accept-Encoding'
            return response

        # REGRA 2: FORÇAR VOLTA AO HTTP (HOME)
        if (clean_path == "" or clean_path == "home") and is_https:
            target_url = request.build_absolute_uri('/').replace('https://', 'http://')
            response = HttpResponseRedirect(target_url)
            
            response['Strict-Transport-Security'] = 'max-age=0'
            response['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0'
            response['Vary'] = 'X-Forwarded-Proto, Accept-Encoding'
            return response
        
        response = self.get_response(request)
        response['Vary'] = 'X-Forwarded-Proto, Accept-Encoding'
        
        if not is_https:
            response['Strict-Transport-Security'] = 'max-age=0'
            
        return response