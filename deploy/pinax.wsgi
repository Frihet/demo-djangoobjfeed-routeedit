# pinax.wsgi is configured to live in projects/TestObjfeed/deploy.

import os
import sys

projectroot = os.path.dirname(os.path.dirname(__file__))
virtualenv = os.path.join(projectroot, 'deps/bin/activate_this.py')
execfile(virtualenv, dict(__file__ = virtualenv))

from os.path import abspath, dirname, join
from site import addsitedir

sys.path.insert(0, abspath(join(dirname(__file__), "../../")))

sys.stdout = open(os.path.join(projectroot, "stdout.log"), "a")

from django.conf import settings
os.environ["DJANGO_SETTINGS_MODULE"] = "demo-djangoobjfeed-routeedit.settings"

sys.path.insert(0, join(settings.PROJECT_ROOT, "apps"))

import fcdjangoutils.monkeypatches

from django.core.handlers.wsgi import WSGIHandler
application = WSGIHandler()
