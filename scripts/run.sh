if [ -d "venv" ];
then
    . venv/bin/activate
    cd backend
    FLASK_ENVIRONMENT="development" flask --app api.py run
    deactivate
else
    echo "Use 'make install' before running the app"
fi
