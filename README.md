# CronyGlasses

CronyGlasses is a web app that presents the most demanded drinks in India and allows you to place orders.

## Table of Contents

- Installation
- Usage
- Contributing
- License

## Installation

To install and run CronyGlasses, you need to have Python 3 and pip installed on your system. You also need to clone the repository from GitHub and install the required packages.

```bash
# Clone the repository
git clone https://github.com/freedompraise/CronyGlasses.git

# Change directory to the project folder
cd CronyGlasses

# Install the required packages
pip install -r requirements.txt

# Set up a virtual environment (optional)
virtualenv env
source env/bin/activate

# Migrate the database
python manage.py makemigrations
python manage.py migrate

# Run the server
python manage.py runserver
```

## Running the tests

To run the tests, follow these steps:

1. **Set up a Testing Database**: Create a separate database for testing. You can configure this in your project's settings

2. **Run the tests**: Run the tests using the following command:

```bash
python manage.py test
```

This command will run all the tests in the tests folder.

## Usage

To use CronyGlasses, open your browser and go to http://localhost:8000/. You will see a list of drinks that are popular in India. You can select any drink and see its details, such as price, ingredients, and ratings. You can also place an order by clicking on the order button and filling out the form.

## Contributing

CronyGlasses is an open source project and welcomes contributions from anyone who is interested. If you want to contribute, please follow these steps:

- Fork the repository on GitHub
- Create a new branch for your feature or bug fix
- Make your changes and commit them with a clear message
- Push your branch to your forked repository
- Create a pull request from your branch to the master branch of CronyGlasses
- Wait for feedback or approval from the maintainers

You can also report issues, suggest features, or ask questions on the issues page. Please follow the issue template and provide as much information as possible.

The current contributors of CronyGlasses are:

- Praise Dike @freedompraise
- Mayur Chaure @mr-mayurchaure

### Support:

- [Twitter](https:twitter.com/freedom_praise)
- [Mail](mail.to:dikepraise119@gmail.com)

## License

CronyGlasses is licensed under the Apache License 2.0. See [LICENSE](https://mit-license.org/) for more details.
