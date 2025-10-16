# ---- 1. Use Python base image ----
FROM python:3.12-slim

# ---- 2. Set Env Variables ----
WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# ---- 3. Copy and install Python dependencies
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# ---- 4. Copy the application code ----
COPY . .
    
# ---- 5. Expose port ----
ENV PORT=8000

# ---- 6. Default Command ----
CMD ["sh", "-c", "python", "main.py"]