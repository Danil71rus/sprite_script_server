# sprite-script-server

## Project setup
```
npm install
```

# Папка dist
В этой папке находиться 'User интерфейс' - собранный проект Vue.
[Ссылка](https://github.com/Danil71rus/sprite_script_web) на сам проект.


# Step_1:  
```
docker build -t files .
```
# Step_2:
```  
docker run --rm --name web -p 3000:3000 -d files
```
#
или 
```
docker run --rm --name web -p 3000:3000 -v /root/sprite_script_web/node_modules:/proj/node_modules -d files
```
