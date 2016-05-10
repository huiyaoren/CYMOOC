# coding: utf8
from flask import Flask
from werkzeug.routing import BaseConverter


class RegexConverter(BaseConverter):  # 正则表达式路由转换器(无效)
    def __int__(self, url_map, *items):
        super(RegexConverter, self).__init__(url_map)
        self.regex = items[0]


app = Flask(__name__)
app.url_map.converters['regex'] = RegexConverter


@app.route('/')
def index():
    return "<h1>hello world</h1>"


@app.route('/user/<int:username>')
def user(username):
    return 'User %d' % username


if __name__ == "__main__":
    app.run(debug=True)
