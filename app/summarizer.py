from langchain_groq import ChatGroq
from langchain_text_splitters import RecursiveCharacterTextSplitter

from .prompts import SUMMARY_PROMPT


class TextSummarizer:

    def __init__(self):

        self.llm = ChatGroq(
            model="openai/gpt-oss-120b",
            temperature=0
        )

        self.chain = SUMMARY_PROMPT | self.llm

        self.splitter = RecursiveCharacterTextSplitter(
            chunk_size=6000,
            chunk_overlap=500
        )


    def summarize_chunk(
        self,
        text: str,
        style: str,
        length: str
    ):

        response = self.chain.invoke({
            "text": text,
            "style": style,
            "length": length
        })

        return response.content.strip()


    def summarize(
        self,
        text: str,
        style: str,
        length: str
    ):

        chunks = self.splitter.split_text(text)

        if not chunks:

            return {
                "summary": "",
                "chunks": 0
            }


        # Small document
        if len(chunks) == 1:

            result = self.summarize_chunk(
                chunks[0],
                style,
                length
            )

            return {
                "summary": result,
                "chunks": 1
            }


        # Large document
        chunk_summaries = []


        for index, chunk in enumerate(chunks):

            chunk_summary = self.summarize_chunk(
                chunk,
                style,
                "medium"
            )

            chunk_summaries.append(
                f"Section {index + 1}:\n{chunk_summary}"
            )


        combined_text = "\n\n".join(
            chunk_summaries
        )


        final_prompt = f"""
You are an expert document summarization assistant.

Below are summaries generated from different sections
of the same document.

Create one final coherent summary.

Rules:

1. Use only the information provided below.
2. Do not invent facts.
3. Remove repeated information.
4. Preserve important details.
5. Make the final result logically organized.
6. Follow the requested style.
7. Follow the requested length.
8. Return only the final summary.

Requested Style:
{style}

Requested Length:
{length}

Section summaries:

{combined_text}
"""


        response = self.llm.invoke(
            final_prompt
        )


        return {
            "summary": response.content.strip(),
            "chunks": len(chunks)
        }