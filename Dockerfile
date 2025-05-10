FROM node:23-slim

WORKDIR /usr/src/app

# Copy package manifests
COPY package.json requirements.txt ./

# Install curl and dependencies for uv, install uv, set up Python env
RUN apt-get update && \
    apt-get install -y curl && \
    curl -LsSf https://astral.sh/uv/install.sh | sh && \
    mv ~/.cargo/bin/uv /usr/local/bin/uv && \
    uv venv && \
    uv pip install -r requirements.txt

# Use venv Python on PATH for runtime
ENV PATH="/usr/src/app/.venv/bin:$PATH"

# Install Node dependencies
RUN npm install

# Create uploads directory for multer
RUN mkdir uploads

# Copy rest of application
COPY . .

# Expose and run
EXPOSE 8000

CMD ["npm", "run", "server"]
