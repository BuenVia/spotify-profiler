# ---- 1. Use Python base image ----
FROM python:3.11-slim

# ---- 2. Set Env Variables ----
WORKDIR /app

# ---- 3. Copy and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ---- 4. Copy the application code ----
COPY . .
    
# ---- 5. Expose port ----
ENV PORT=8000

# ---- 6. Default Command ----
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port $PORT"]
