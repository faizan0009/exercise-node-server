//////////////////////////////////////////////////////////////////////////////////////////////////
// Microservice facade requirements
//////////////////////////////////////////////////////////////////////////////////////////////////
// uncomment line below to connect to db.
// import { database } from '../databases';
import { MicroserviceResponse, MicroserviceRequest } from './models';

//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Microservice facade methods
 */
export class FacadeMicroservice {
	/**example
	 *
	 * an example method for template
	 *
	 * @param request		: greeting from user.
	 *
	 * @return
	 */
	static greet(request: MicroserviceRequest ): Promise<MicroserviceResponse> {
		return new Promise((resolve, _reject) => {
			// use the imported database class/function to pull data from db.
			// complete your method here and resolve as required:

			resolve({ greeting: `${request.greeting} from server.`})
		})
	}
}

export default FacadeMicroservice