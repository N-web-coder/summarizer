from pathlib import Path

from pypdf import PdfReader

from docx import Document


# ==========================================
# TXT EXTRACTION
# ==========================================

def extract_txt(file_path: str) -> str:

    path = Path(file_path)

    return path.read_text(
        encoding="utf-8",
        errors="ignore"
    )


# ==========================================
# PDF EXTRACTION
# ==========================================

def extract_pdf(file_path: str) -> str:

    reader = PdfReader(file_path)

    text = []

    for page in reader.pages:

        page_text = page.extract_text()

        if page_text:

            text.append(page_text)


    return "\n".join(text)


# ==========================================
# DOCX EXTRACTION
# ==========================================

def extract_docx(file_path: str) -> str:

    document = Document(file_path)

    text = []

    for paragraph in document.paragraphs:

        if paragraph.text.strip():

            text.append(
                paragraph.text
            )


    return "\n".join(text)


# ==========================================
# MAIN TEXT EXTRACTION
# ==========================================

def extract_text(file_path: str) -> str:

    extension = Path(
        file_path
    ).suffix.lower()


    if extension == ".txt":

        return extract_txt(file_path)


    elif extension == ".pdf":

        return extract_pdf(file_path)


    elif extension == ".docx":

        return extract_docx(file_path)


    else:

        raise ValueError(
            "Unsupported file type. "
            "Only TXT, PDF and DOCX files are supported."
        )