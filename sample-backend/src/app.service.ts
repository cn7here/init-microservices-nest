import { Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./create-user.dto";
import { ClientProxy } from "@nestjs/microservices";
import { CreateUserEvent } from "./create-user.event";

@Injectable()
export class AppService {
  private readonly users: any[] = [];

  constructor(
    @Inject("COMMUNICATION") private readonly communicationClient: ClientProxy,
    @Inject("ANALYTICS") private readonly analyticsClient: ClientProxy,
  ) {}

  getHello(): string {
    return "Hello World!";
  }

  createUser(input: CreateUserDto) {
    this.users.push(input);
    console.log(this.users);
    this.communicationClient.emit("user_created", new CreateUserEvent(input.email));
    this.analyticsClient.emit("user_created", new CreateUserEvent(input.email));
  }

  getAnalytics() {
    return this.analyticsClient.send({ cmd: "get_analytics" }, {});
  }
}
