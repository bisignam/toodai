FROM mongo:5.0.3
COPY scripts/init.js /docker-entrypoint-initdb.d/
COPY keyfile/mongo-keyfile /opt/
RUN chmod 400 /opt/mongo-keyfile
RUN chown 999:999 /opt/mongo-keyfile
ENTRYPOINT ["docker-entrypoint.sh"]
EXPOSE 27017
CMD ["mongod"]