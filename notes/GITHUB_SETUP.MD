Alright Ritam, here’s the proper workflow you should follow whenever you open your GitHub Codespace for this project.

# ✅ FIRST: How To Stop Everything Properly

Since many ports/services are running, stop them cleanly before closing Codespace.

## 1. Stop Skaffold (if running)

If terminal is stuck showing logs:

Press:

```bash
CTRL + C
```

This stops:

* auto rebuild
* auto deploy
* live logs

---

## 2. Stop Port Forwarding Processes

Check running processes:

```bash
ps aux | grep kubectl
```

If you see:

* port-forward
* proxy
* kubectl running

Kill them:

```bash
pkill -f kubectl
```

---

## 3. Stop Node Servers (optional)

```bash
pkill node
```

This stops local Node.js servers.

---

## 4. Stop Kubernetes Cluster (Optional)

If using K3s/k3d/minikube and want full shutdown:

For K3s:

```bash
sudo systemctl stop k3s
```

OR for k3d:

```bash
k3d cluster stop
```

(Depends what your mentor used.)

---

# ✅ BEFORE LEAVING CODESPACE

Always save changes:

```bash
git status
```

Then:

```bash
git add .
git commit -m "progress update"
```

(Optional push)

```bash
git push
```

This is VERY important.

---

# 🚀 WHEN YOU COME BACK AGAIN

Follow this order.

# STEP 1 — Open Project

```bash
cd /workspaces/codespaces-blank
```

Check files:

```bash
ls
```

You should see:

* frontend
* sandbox
* k8s
* template
* skaffold.yml

---

# STEP 2 — Start Kubernetes

If K3s:

```bash
sudo systemctl start k3s
```

Check cluster:

```bash
kubectl get nodes
```

You should see:

```bash
Ready
```

---

# STEP 3 — Check Docker Images

```bash
docker images
```

Verify:

* sandbox
* sandbox-agent
* sandbox-sync
* template

exist.

---

# STEP 4 — Apply Kubernetes Files

```bash
kubectl apply -f k8s/
```

---

# STEP 5 — Check Pods

```bash
kubectl get pods
```

Wait until:

```bash
Running
```

---

# STEP 6 — Check Services

```bash
kubectl get svc
```

---

# STEP 7 — Check Ingress

```bash
kubectl get ingress
```

---

# STEP 8 — View Logs (IMPORTANT)

Backend logs:

```bash
kubectl logs -f deployment/sandbox
```

Frontend logs:

```bash
kubectl logs -f deployment/frontend
```

---

# STEP 9 — Start Skaffold (Optional)

When developing:

```bash
skaffold dev
```

This automatically:

* rebuilds images
* redeploys
* watches changes

Stop using:

```bash
CTRL + C
```

---

# 🔥 MOST IMPORTANT DEBUG COMMANDS

These are your daily commands now:

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

```bash
kubectl logs -f deployment/sandbox
```

---

## Describe Errors

```bash
kubectl describe pod <pod-name>
```

---

## Restart Deployment

```bash
kubectl rollout restart deployment sandbox
```

---

# ✅ YOUR NORMAL DAILY FLOW

Whenever you open Codespace:

```bash
cd /workspaces/codespaces-blank
sudo systemctl start k3s
kubectl get nodes
kubectl apply -f k8s/
kubectl get pods
skaffold dev
```

That is basically your startup workflow.

---

# ⚠️ VERY IMPORTANT LEARNING

Now your project is entering real DevOps workflow.

The main skill now is NOT coding.

The main skill is:

* debugging
* checking logs
* understanding pods
* networking
* deployments
* services
* ingress

This phase feels confusing initially for everyone.
