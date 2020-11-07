   docker stack rm jasonbrazeal_com
   docker secret rm key
   docker secret rm crt
   docker secret rm dh
   # start nginx-letsencrypt container needed for renewal
   docker run -d --rm -v 'webroot:/usr/share/nginx/html' -p 80:80 --name nginx-letsencrypt jsonbrazeal/jasonbrazeal.com:nginx-letsencrypt-jasonbrazeal.com
   # renew cert (dry run)
   docker run --rm --name certbot   -v '/etc/letsencrypt:/etc/letsencrypt'   -v '/var/log/letsencrypt:/var/log/letsencrypt'   -v '/var/lib/letsencrypt:/var/lib/letsencrypt'   -v 'webroot:/webroot'   certbot/certbot certonly -n   --staging --agree-tos --webroot   --webroot-path=/webroot   --register-unsafely-without-email   -d 'jasonbrazeal.com'   -d 'www.jasonbrazeal.com'   -d 'web.jasonbrazeal.com'
   # remove cruft from dry run
   rm -rf /var/lib/letsencrypt/* /var/log/letsencrypt/* /etc/letsencrypt/*
   # renew cert (for realz)
   docker run --rm --name certbot   -v '/etc/letsencrypt:/etc/letsencrypt'   -v '/var/log/letsencrypt:/var/log/letsencrypt'   -v '/var/lib/letsencrypt:/var/lib/letsencrypt'   -v 'webroot:/webroot'   certbot/certbot certonly -n   --agree-tos  --webroot   --webroot-path=/webroot   -m 'dev@jasonbrazeal.com' --no-eff-email   -d 'jasonbrazeal.com'   -d 'www.jasonbrazeal.com'   -d 'web.jasonbrazeal.com'
   # create new secrets 
   cat /etc/letsencrypt/live/jasonbrazeal.com/fullchain.pem | docker secret create crt -
   cat /etc/letsencrypt/live/jasonbrazeal.com/privkey.pem | docker secret create key -
   openssl dhparam -out /etc/letsencrypt/live/jasonbrazeal.com/dhparam-2048.pem 2048
   cat /etc/letsencrypt/live/jasonbrazeal.com/dhparam-2048.pem | docker secret create dh -
   # deploy stack   
   docker stack deploy -c docker-compose.yml jasonbrazeal_com
