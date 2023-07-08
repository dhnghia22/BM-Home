import { urlPath } from "@/constants/url-path";
import { ApiService } from "@/utils/api-client"

 export const HomeApiServices = {
    getHomeData(): Promise<object> {
        return ApiService.instance.get<object>(urlPath.views.home);
    }
 }