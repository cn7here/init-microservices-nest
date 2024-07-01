import { Injectable } from "@nestjs/common";
import { CreateUserEvent } from "./create-user.event";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }

  handleUserCreated(data: CreateUserEvent) {
    console.log("handleUserCreated - COMMUNICATIONs", data);
    /**
    // TODO Gửi email cho user chẳng hạn ...
    **/
  }
}
