"""REST API for tricks."""
import flask
import backend
from flask_cors import CORS

CORS(backend.app)

@backend.app.route('/api/v1/tricks/<trick>')
def get_trick(trick):

    connection = backend.model.get_db()
    cur = connection.execute(
        "SELECT * FROM tricks WHERE trickname = ?", (trick,)
    )
    trick_info = cur.fetchall()[0]
    print(trick_info)
    
    return flask.jsonify({
        "trick": trick_info
    })