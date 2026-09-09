<!-- AI Text Summarizer Project -->

# AI Text Summarizer

An AI-powered text summarization application built using **FastAPI, LangChain, and Groq LLM**.

# Features

* AI-powered text summarization
* Simple summary
* Professional summary
* Bullet-point summary
* Short, Medium and Detailed summary
* Word counter
* Character counter
* Copy summary
* Clear text
* Loading indicator
* Error handling
* FastAPI REST API
* Responsive web UI
* Swagger API documentation

# Tech Stack

* Python 3.10+
* FastAPI
* Uvicorn
* LangChain
* LangChain Core
* LangChain Groq
* Groq LLM
* Jinja2
* HTML
* CSS
* JavaScript
* python-dotenv

# How To Run

## 1. Create Environment

```bash
conda create -n summarizer python=3.10 -y

conda activate summarizer
```

## 2. Install Requirements

```bash
pip install -r requirements.txt
```

## 3. Configure Groq API Key

Create a `.env` file in the project root.

```env
GROQ_API_KEY=your_groq_api_key_here
```

## 4. Run FastAPI Application

```bash
uvicorn app.main:app --reload
```

## 5. Open Application

Open your browser and visit:

http://127.0.0.1:8000

# FastAPI Documentation

FastAPI automatically provides Swagger documentation.

Open:

```text
http://127.0.0.1:8000/docs
```

You can test the `/api/summarize` endpoint directly from Swagger UI.

---

# API Endpoint

## POST `/api/summarize`

### Request

```json
{
    "text": "Your long text here...",
    "style": "simple",
    "length": "medium"
}
```

### Available Styles

```text
simple
professional
bullet_points
```

### Available Lengths

```text
short
medium
detailed
```

### Response

```json
{
    "success": true,
    "summary": "Generated summary..."
}
```

---

# Application Workflow

```text
User
  │
  ▼
Web UI
  │
  ▼
JavaScript Fetch API
  │
  ▼
FastAPI
  │
  ▼
Pydantic Validation
  │
  ▼
LangChain Prompt
  │
  ▼
Groq LLM
  │
  ▼
Generated Summary
  │
  ▼
FastAPI Response
  │
  ▼
Web UI
```

---

# How It Works

### 1. User enters text

The user enters an article, notes, documentation, or any other text into the text area.

### 2. User selects options

The user can select:

* Summary style
* Summary length

### 3. Frontend sends request

JavaScript sends the text and selected options to:

```text
/api/summarize
```

### 4. FastAPI processes request

FastAPI validates the incoming data using Pydantic.

### 5. LangChain creates the prompt

LangChain uses `ChatPromptTemplate` to create the prompt for the LLM.

### 6. Groq generates summary

The request is sent to the Groq LLM through `ChatGroq`.

### 7. Result is returned

FastAPI returns the generated summary as JSON.

### 8. UI displays summary

JavaScript receives the response and displays it on the page.

---

# Main Files

## `app/main.py`

Responsible for:

* Creating FastAPI application
* Creating API endpoints
* Request validation
* Serving HTML
* Serving static files

---

## `app/summarizer.py`

Responsible for:

* Initializing Groq LLM
* Creating LangChain chain
* Generating summaries

---

## `app/prompts.py`

Contains:

* System prompt
* Summary style instructions
* Summary length instructions

---

## `app/templates/index.html`

Contains the frontend structure:

* Text input
* Style selection
* Length selection
* Summarize button
* Result section

---

## `app/static/style.css`

Responsible for:

* UI design
* Layout
* Responsive design
* Buttons
* Cards
* Mobile support

---

## `app/static/app.js`

Responsible for:

* Calling FastAPI API
* Word counter
* Character counter
* Loading state
* Error handling
* Copy summary
* Clear button

---

# Requirements

Python:

```text
Python 3.10+
```

Required packages:

```text
fastapi
uvicorn
jinja2
python-multipart
python-dotenv
langchain
langchain-core
langchain-groq
```

# Example

### Input

```text
Laravel is a PHP framework designed for web application development.
It provides features such as routing, middleware, controllers,
database migrations, authentication and queues.
```

### Selected Options

```text
Style: Simple
Length: Medium
```

### Output

```text
Laravel is a PHP web framework that provides features such as
routing, middleware, controllers, migrations, authentication
and queues.
```

---

# Learning Objectives

By building this project, you will learn:

1. Python virtual environments
2. FastAPI
3. REST APIs
4. POST requests
5. Pydantic models
6. Jinja2 templates
7. Static files
8. HTML/CSS/JavaScript integration
9. JavaScript Fetch API
10. Environment variables
11. LangChain
12. ChatPromptTemplate
13. LCEL
14. Groq LLM
15. API error handling

# Project Goal

The goal of this project is to understand how to build a complete beginner-friendly GenAI application using:

```text
Frontend
    +
FastAPI
    +
LangChain
    +
Groq LLM
```

