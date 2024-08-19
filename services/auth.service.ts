export class AuthService {
    private apiUrl: string;

    constructor() {
        this.apiUrl = 'https://jpsselgis.selangor.gov.my/portal/sharing/rest/generateToken';
    }

    async login(username: string, password: string): Promise<{ token?: string, error?: string }> {
        console.info('Username : ', username)
        console.info('Password : ', password)

        const referer = location.origin;

        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    username: username,
                    password: password,
                    client: 'referer',
                    referer: referer,
                    f: 'json',
                }),
            });

            const data = await response.json();

            if (data.error) {
                return { error: 'Username or password is wrong' };
            } else if (data.token) {
                const expires = new Date(data.expires);
                document.cookie = `token=${data.token}; expires=${expires.toUTCString()}`;
                return { token: data.token };
            }
        } catch (error) {
            console.error('Login failed', error);

        }
        // Add a return statement at the end of the function
        return { error: 'An unknown error occurred' };
    }   
}
