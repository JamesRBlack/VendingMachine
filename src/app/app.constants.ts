import { environment } from 'src/environments/environment';

let serverPath = environment.serverPath;

export class AppConstants {
    public static readonly serverPath: string = serverPath;
    /* API url constants. */
    // Fake API url.
    public static readonly apiUrl: string = serverPath + '/items';

    /* App paths constants. */
    public static readonly homePath: string = 'home';

    /* Other stuffs. */
}