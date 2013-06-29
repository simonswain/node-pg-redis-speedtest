Testing Node receiving data via Redis lists, and inserting into table.


```
npm install -d
cp config/config.sample.js config/config.js

# create your postgresql database
# edit config/config.js

# init the db tables
grunt reset

# create items to record samples against
node create
```

Now open up three shells

```
# view metrics
node count
```

```
# start processing
node process
```

```
# inject data to the queue
node inject
```

