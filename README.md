# Trip Buddy

Collaborative trip building application with Typescript/React/Express/Graphql/Postgres

## setup

Required software
1. node 12
2. postgres

### production setup (ssh'd into server as sudo root user 'clayton')

Required software (in addition to those required below the initial setup)
1. nginx

```bash
cd /var/www/
sudo git clone git@github.com:dorsett85/trip-buddy
sudo chown -R clayton:clayton trip-buddy/
cd trip-buddy/

# Add Backend environment variables
cd backend/
cp .env.example.json .env.json
vim .env.json
# Add the following values to the .env.json file and save/exit
# "ENV": "production"
# "JWT_SECRET_KEY": "PRIVATE_KEY",
# "DB_CONNECTION": "postgres://clayton:password@localhost:5432/trip_buddy"

# Create trip_buddy database and assign new owner
psql -d postgres
CREATE DATABASE trip_buddy;
ALTER DATABASE trip_buddy OWNER TO clayton;
\q

# Compile typescript
npx tsc --skipLibCheck

# Run migrations
npm i
npm run migrate -- -ua
npm run seed -- -a # optional

# Build frontend
cd ../frontend/
npm i
npm run build 
```

Next up we'll follow the tutorial at this link (starting from "Creating Unit Files", and update the .service file appropriately):

https://rollout.io/blog/running-node-js-linux-systemd/

And last, use this tutorial for setting up nginx (starting from "Step 4 — Setting Up Nginx as a Reverse Proxy Server"):

https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-20-04
