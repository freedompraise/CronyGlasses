# Crony Glasses

<h3> A web app that presents the most demanded drinks in India and allows you to place orders </h3>

<div style = "background-colour:black" > 
   </div>
   <div align="center">
<img width="30%" alt="CronyGlasses" src="static/drawable/icon-circle.png">

# CronyGLasses

</div>

## Table of Contents

- [Installation](#installation)
- [Team](#team)
- [Support](#team)
- [License](#license)
- [Copyright](#copyright)

## Installation

````

--> Create a virtual environment :
```bash
# Let's install virtualenv first
pip install virtualenv

# Then we create our virtual environment
virtualenv envname

````

--> Activate the virtual environment :

```bash
envname\scripts\activate

```

--> Install the requirements :

```bash
pip install -r requirements.txt
```

**2.Setup Virtualenv**

```sh
virtualenv env
source env/bin/activate
```

**3.Migrate $ Start Server**

```sh
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```
