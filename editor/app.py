from flask import Flask
from editor.routes import flow_bp

def create_app():
    app = Flask(__name__)

    # registra o blueprint
    app.register_blueprint(flow_bp, url_prefix="/")

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )

# rodar a app
# na pasta LAS-NoCode-Rule-Editor>
# rodar:  python -m editor.app