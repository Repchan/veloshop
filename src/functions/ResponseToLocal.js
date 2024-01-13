async function responseToLocal() {
    const savedUser = JSON.parse(localStorage.getItem("authData"));
    if (savedUser) {
        try {
            const response = await fetch(`http://localhost:3000/users/search/${savedUser.login}`);
            if (response.ok) {
                const data = await response.json();
                if (savedUser.password === data.Password) {
                    return savedUser;
                } else {
                    return null;
                }
            }
            if (response.status === 404) {
                alert("Такого пользователя не существует");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            return null
        }
    }
}

export default responseToLocal;