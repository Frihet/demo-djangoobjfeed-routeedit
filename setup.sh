#! /bin/bash

#! /bin/bash

ROOT="$(cd "$(dirname $0)/.."; pwd)"

mkdir -p /tmp/fs
cd /tmp/fs
wget http://pypi.python.org/packages/source/p/pip/pip-0.8.1.tar.gz
tar -zxf pip-0.8.1.tar.gz
cd pip-0.8.1

sudo apt-get install python-setuptools python-virtualenv gettext python-libxml2

sudo python setup.py install --prefix=/usr/local
cd /
rm -rf /tmp/fs

virtualenv "$ROOT/deps"
cd "$ROOT/deps"
. bin/activate
pip install Pinax
pip install pil

pinax-admin setup_project -b social dummy
rm -rf dummy

cd "$ROOT/apps"

git clone git://github.com/freecode/fcdjangoutils.git
git clone git://github.com/freecode/djangoobjfeed.git
git clone git://github.com/freecode/routeedit.git
