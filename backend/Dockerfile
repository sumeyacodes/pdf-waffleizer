FROM node:23-slim

# Set working directory inside the container
WORKDIR /usr/src/app

# Install system-level dependencies
# - python3: Required for Python/Pip operations
# - curl: Needed to download files
# - ca-certificates: SSL certificate bundles for secure connections
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    python3 \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*  # Clean up package lists to reduce image size

# Install uv (Python package installer)
# 1. Download the installer script with execute permissions
# 2. Run the installer
# 3. Remove the installer script after execution
ADD --chmod=755 https://astral.sh/uv/install.sh  /install.sh
RUN /install.sh && rm /install.sh

# Add uv to system PATH so it's accessible everywhere
ENV PATH="/root/.local/bin:$PATH"

# --- Python Environment Setup ---
# Create a virtual environment at /opt/venv to isolate Python dependencies
RUN uv venv /opt/venv

# Activate the virtual environment by:
# 1. Setting VIRTUAL_ENV variable
# 2. Adding venv's bin directory to PATH
ENV VIRTUAL_ENV=/opt/venv
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# Install Python dependencies from requirements.txt
# - Uses the virtual environment's pip (due to PATH setup)
COPY requirements.txt ./
RUN uv pip install -r requirements.txt

# --- Node.js Setup ---
# Copy package files first to use Docker layer caching
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# --- Application Setup ---
# Create directory for file multer PDF file uploads
RUN mkdir -p uploads

# Copy all application source code
# (Done after dependency installation to optimize layer caching)
COPY . .

# Expose port 3000 for the Node.js application
EXPOSE 3000

# Command to start the application
CMD ["npm", "run", "start"]