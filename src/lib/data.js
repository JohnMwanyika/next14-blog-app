// Temporary Data
const users = [
    { id: 1, name: "Valen W Mwamburi", title: "Product owner" },
    { id: 2, name: "John B Mwanyika", title: "Software developer" },
];

const posts = [
    { id: 1, title: "Post 1", body: 'Lorem ipsum..........', userId: 1 },
    { id: 2, title: "Post 2", body: 'Lorem ipsum..........', userId: 1 },
    { id: 3, title: "Post 3", body: 'Lorem ipsum..........', userId: 2 },
    { id: 4, title: "Post 4", body: 'Lorem ipsum..........', userId: 2 },
]

export const getPosts = () => {
    return posts;
}

export const getPost = (id) => {
    return posts.find(post => post.id == id);
}
export const getUsers = () => {
    return users;
}

export const getUser = (id) => {
    return users.find(user => user.id == id);
}

