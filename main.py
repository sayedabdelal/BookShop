from config import create_app, db
from flask import render_template, request, flash, redirect, url_for
from User_Models import User
from flask_login import login_user, logout_user, login_required, current_user

app = create_app()

@app.route("/")
def landing():
    return render_template("landing.html")

@app.route('/home')
def home():
    return render_template('home.html')

@app.route("/login", methods=["GET", "POST"])
def login():
    data = request.form
    if request.method == "POST":
        email = data.get("email")
        password = data.get("password")
        user = User.query.filter_by(email=email).first()
        if user:
            if user.password == password:
                flash("Login successful", category="success")
                login_user(user, remember=True)
                return redirect(url_for("home"))
            else:
                flash("Incorrect password", category="danger")
        else:
            flash("User does not exist", category="danger")
    return render_template("login.html", user=current_user)



@app.route("/register", methods=["GET", "POST"])
def signup():
    data = request.form
    if request.method == "POST":
        fname = data.get("fname")
        lname = data.get("lname")
        username = data.get("username")
        email = data.get("email")
        password1 = data.get("password1")
        password2 = data.get("password2")
        
        user = User.query.filter_by(email=email).first()
        if user:
            flash("Email is already exist try another one", category="danger")
        if not fname or len(fname) < 2:
            flash("First name must be at least 2 characters", category="danger")
        elif not lname or len(lname) < 2:
            flash("Last name must be at least 2 characters", category="danger")
        elif not username or len(username) < 2:
            flash("Username must be at least 2 characters", category="danger")
        elif not email or len(email) < 4:
            flash("Email must be at least 4 characters", category="danger")
        elif not password1 or len(password1) < 7:
            flash("Password must be at least 7 characters", category="danger")
        elif password1 != password2:
            flash("Passwords do not match", category="danger")
        else:
            new_user = User(fname=fname, lname=lname, username=username, email=email, password=password1)
            db.session.add(new_user)
            db.session.commit()
            flash("Account created successful", category="success")
            login_user(user, remember=True)
            return redirect(url_for("home"))
    return render_template("register.html", user=current_user)

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)
