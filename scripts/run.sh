if [ -d "venv" ];
then
    . venv/bin/activate
    flask --app src/flask/flaskServer.py run
    deactivate
else
    echo "Use 'make install' before running the app"
fi