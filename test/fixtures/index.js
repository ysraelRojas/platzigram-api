export default {
    getImage(){
        return {
            id: '1088614b-7083-4824-a727-2c8aa95035e2',
            publicId: '38oG6weEErfShbnYD1jA8o',
            userId: 'platzigram',
            liked: false,
            likes: 0,
            src: 'http://platzigram.test/38oG6weEErfShbnYD1jA8o.jpg',
            description: '#awesome',
            tags: ['awesome'],
            createdAt:new Date().toString()
        }
    },
    getImages(){
        return [
            this.getImage(),
            this.getImage(),
            this.getImage()
        ]
    },
    getImagesByTag(){
        return [
            this.getImage(),
            this.getImage()
        ]
    },
    getUser(){
        return {
            id: '1088614b-7083-4824-a727-2c8aa95035e2',
            name: 'Freddy Vega',
            username: 'freddier',
            email: 'f@platzi.test',
            password: 'pl4tzi',
            createdAt: new Date().toString()
        }
    }
}