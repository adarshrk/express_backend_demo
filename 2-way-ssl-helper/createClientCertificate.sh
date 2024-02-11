#!/bin/sh

# Note: Run the shell script using sudo command only, else permission denied: sudo sh createClientCertificate.sh

# To enable mutual SSL authentication based on certificates, both parties need to accept the other’s authority by providing a 
# valid certificate. A certification authority (CA) verifies these digital keys, from the server, and from the client.
# This includes some overhead and is not applicable to common user applications. That’s why mTLS authentication is much more 
# widespread in B2B applications, where security requirements are usually more strict and the number of clients connecting to 
# specific services is limited.

# The client requests a resource on the server side [1] which will be answered with the certificate of the server [2]. 
# After receiving the certificate, the client verifies if it is valid [3]. If the validation has been successful, the client 
# sends its certificate to the server [4]. The server on his side does also a verification of the incoming certificate [5]. 
# When everything is fine and the client proved its identity, the resource is ready for request and information can be exchanged 
# from both parties [6].

# Please note that a server’s SSL certificate does not necessarily have to be signed by the same authority as the one from 
# the client. Any authority for instance the most familiar one, LetsEncrypt could be used. However, both parties should be 
# aware of the respective CA.

# Before you can teach your server to speak TLS, you will need a certificate issued by a trusted certificate authority (CA)
# Request a copy of your CA root certificate, which will be used to make sure each application can trust certificates 
# presented by other applications.

client_hostnme='client.clientDomain.com'
localhost_ip='127.0.0.1'

echo 'Welcome to mutual TLS/2-way-ssl'

# Add hostname in host files
echo '$localhost_ip  $client_hostnme' >> /etc/hosts

echo 'We are going to create a Certification Authority (CA) certificate for the server with 1 year validity and the related key'

echo 'creating client certificate folder'
rm -rf clientCerts
mkdir clientCerts

openssl req -new -x509 -days 365 -keyout clientCerts/client-ca-key.pem -out clientCerts/client-ca-crt.pem
# Enter PEM pass phrase: Adarsh
# The PEM pass phrase is optional. The other questions are not mandatory but it’s better if you answer all. 
# The most important question is the Common Name which should be the server main domain (serverDomain.com).

echo 'Now we generate the actual client certificate which will be used in the ssl handshake.'
# First of all we have to generate a random key (4096 bit length in our example)
openssl genrsa -out clientCerts/client-key.pem 4096

echo 'Next we generate a Certificate Signing Request (CSR) with the key we have generated'
openssl req -new -sha256 -key clientCerts/client-key.pem -out clientCerts/client-csr.pem
# Pay attention to the Common Name which must have the same name of the host will serve the application (server.serverDomain.com)

echo 'As final step, generate the client certificate (validity 1 year) from the CSR previously created and sign it with the CA key'
openssl x509 -req -days 365 -in clientCerts/client-csr.pem -CA clientCerts/client-ca-crt.pem -CAkey clientCerts/client-ca-key.pem -CAcreateserial -out clientCerts/client-crt.pem
# The password requested is the one inserted during CA key generation

echo 'To verify the certificate signature against the CA'
openssl verify -CAfile clientCerts/client-ca-crt.pem clientCerts/client-crt.pem

# Reference:
# https://smallstep.com/hello-mtls/doc/combined/express/nodejs
# https://www.matteomattei.com/client-and-server-ssl-mutual-authentication-with-nodejs/
# https://medium.com/geekculture/mtls-with-nginx-and-nodejs-e3d0980ed950
