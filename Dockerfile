FROM node:23-slim

WORKDIR /usr/src/app

# Copy package manifests
COPY package.json requirements.txt ./

# Install Python3, venv, pip, set up virtualenv and install Python deps
RUN apt-get update && \
    apt-get install -y python3 python3-venv python3-pip && \
    rm -rf /var/lib/apt/lists/* && \
    python3 -m venv .venv && \
    .venv/bin/pip install --no-cache-dir -r requirements.txt

# Use venv Python on PATH for runtime
ENV PATH="/usr/src/app/.venv/bin:$PATH"

# Install Node dependencies
RUN npm install

# Create uploads directory for multer
RUN mkdir uploads

# Copy rest of application
COPY . .

# Expose and run
EXPOSE 3000

CMD ["npm", "run", "server"]