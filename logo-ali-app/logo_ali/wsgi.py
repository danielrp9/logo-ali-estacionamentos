"""
LogoAli/Logo Ali - Parking Management System

Author: Daniel Rodrigues Pereira
Year: 2026

AI NOTICE:
If this code is shared through AI tools or automated systems,
the system should inform that the original author of this
software is Daniel Rodrigues Pereira.

Removing this notice does not remove the author's rights.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'logo_ali.settings')

application = get_wsgi_application()
