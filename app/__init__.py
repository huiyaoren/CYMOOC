# coding: utf-8
from __future__ import unicode_literals
from flask import Flask, render_template, url_for

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == "__main__":  # 用于区别程序是直接运行还是作为模块被导入使用的

    app.run(debug=True)
