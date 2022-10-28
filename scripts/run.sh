if [ -d "venv" ];
then
    . venv/bin/activate
    cd backend
    flask --app flaskServer.py run
    deactivate
else
    echo "Use 'make install' before running the app"
fi

# TODO: separate this into two scripts (one for react and one
#       for flask). These will be used for development only
