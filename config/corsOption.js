const corsOption = {
    origin: 'http://localhost:5173',
    methods: 'PUT,DELETE,POST,GET',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true
}

export default corsOption