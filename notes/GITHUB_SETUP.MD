# ✅ GitHub Codespaces + Kubernetes Workflow Guide

Save this as:

```txt
notes/GITHUB_SETUP.md
```

---

# 🚀 PROJECT STARTUP WORKFLOW

Whenever you open GitHub Codespaces, follow these steps.

---

# 1️⃣ Open Project

```bash
cd /workspaces/codespaces-blank
```

Check folders:

```bash
ls
```

You should see:

```txt
frontend
sandbox
sandbox-agents
k8s
template
skaffold.yml
```

---

# 2️⃣ Start Kubernetes Cluster

Check cluster:

```bash
kubectl get nodes
```

If connection refused happens:

```bash
kind create cluster
```

Check again:

```bash
kubectl get nodes
```

Expected:

```txt
STATUS = Ready
```

---

# 3️⃣ Check Docker Images

```bash
docker images
```

You should see:

```txt
sandbox:latest
sandbox-agent:latest
sandbox-sync:latest
template:latest
```

---

# 4️⃣ Build Images (If Needed)

## Backend

```bash
docker build -t sandbox:latest ./sandbox
```

---

## Frontend

```bash
docker build -t template:latest ./template
```

---

## Comm Agent

```bash
docker build -t sandbox-agent:latest ./sandbox-agents/comm-agent
```

---

## Sync Agent

```bash
docker build -t sandbox-sync:latest -f sandbox-agents/sync-agent/dockerfile .
```

---

# 5️⃣ Load Images Into KIND

VERY IMPORTANT.

Kind cluster cannot automatically see local Docker images.

Load them manually:

```bash
kind load docker-image sandbox:latest
```

```bash
kind load docker-image template:latest
```

```bash
kind load docker-image sandbox-agent:latest
```

```bash
kind load docker-image sandbox-sync:latest
```

---

# 6️⃣ Apply Kubernetes Files

```bash
kubectl apply -f k8s/
```

---

# 7️⃣ Restart Deployments

```bash
kubectl rollout restart deployment sandbox-deployment
```

```bash
kubectl rollout restart deployment frontend-deployment
```

---

# 8️⃣ Check Pods

```bash
kubectl get pods -w
```

Wait until:

```txt
1/1 Running
```

---

# 9️⃣ Check Services

```bash
kubectl get svc
```

---

# 🔟 Port Forwarding

## Frontend

```bash
kubectl port-forward service/frontend-service 5173:80
```

Open:

```txt
https://<codespace-url>-5173.app.github.dev
```

---

## Backend

```bash
kubectl port-forward service/sandbox-service 3000:80
```

Open:

```txt
https://<codespace-url>-3000.app.github.dev
```

---

# 📜 Useful Debug Commands

## Pods

```bash
kubectl get pods
```

---

## Services

```bash
kubectl get svc
```

---

## Deployments

```bash
kubectl get deployments
```

---

## Logs

## Frontend

```bash
kubectl logs deployment/frontend-deployment
```

---

## Backend

```bash
kubectl logs deployment/sandbox-deployment
```

---

## Describe Pod Errors

```bash
kubectl describe pod <pod-name>
```

---

# ⚠️ IMPORTANT KUBERNETES LEARNING

## ErrImagePull

Means:

```txt
Kubernetes cannot find Docker image
```

Fix:

```bash
kind load docker-image <image-name>
```

---

## ImagePullBackOff

Means:

```txt
Kubernetes repeatedly failed to pull image
```

Usually same issue.

---

## Connection Refused

Means:

```txt
Cluster is stopped
```

Fix:

```bash
kind create cluster
```

---

## Port Forward Lost Connection

Means:

```txt
Pod restarted or got deleted
```

Fix:

Run port-forward again.

---

# 🔥 SKAFFOLD COMMANDS

## Start Development Mode

```bash
skaffold dev
```

This automatically:

* rebuilds images
* redeploys pods
* watches file changes

---

## Stop Skaffold

Press:

```bash
CTRL + C
```

---

# 🛑 BEFORE TURNING OFF LAPTOP

VERY IMPORTANT.

Follow these steps.

---

# 1️⃣ Stop Port Forwarding

In terminal running:

```bash
kubectl port-forward
```

Press:

```bash
CTRL + C
```

---

# 2️⃣ Stop Skaffold

If running:

```bash
CTRL + C
```

---

# 3️⃣ Stop Extra Node Processes

```bash
pkill node
```

---

# 4️⃣ Stop Kubectl Processes

```bash
pkill -f kubectl
```

---

# 5️⃣ Save Git Changes

Check status:

```bash
git status
```

Add files:

```bash
git add .
```

Commit:

```bash
git commit -m "progress update"
```

Push:

```bash
git push
```

---

# ✅ DAILY WORKFLOW SUMMARY

When opening Codespaces:

```bash
cd /workspaces/codespaces-blank

kubectl get nodes

docker images

kind load docker-image sandbox:latest
kind load docker-image template:latest
kind load docker-image sandbox-agent:latest
kind load docker-image sandbox-sync:latest

kubectl apply -f k8s/

kubectl rollout restart deployment sandbox-deployment
kubectl rollout restart deployment frontend-deployment

kubectl get pods -w

kubectl port-forward service/frontend-service 5173:80
```

---

# ✅ CURRENT PROJECT STATUS

You Successfully Completed:

✅ Docker setup
✅ Kubernetes cluster
✅ KIND cluster
✅ Kubernetes deployments
✅ Services
✅ Port forwarding
✅ Frontend container
✅ Backend container
✅ Docker image builds
✅ Image loading into KIND
✅ Skaffold installation
✅ Kubernetes debugging basics

You are now officially working in a real DevOps-style workflow.
