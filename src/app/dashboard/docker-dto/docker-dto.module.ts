import NetworkSettings = DockerDtoModule.NetworkSettings;
import HostConfig = DockerDtoModule.HostConfig;
import Labels = DockerDtoModule.Labels;
import Port = DockerDtoModule.Port;
import IDocker = DockerDtoModule.IDocker;
declare module DockerDtoModule {

  export interface Port {
    PrivatePort: number;
    Type: string;
  }

  export interface Labels {
    License: string;
    Vendor: string;
  }

  export interface HostConfig {
    NetworkMode: string;
  }

  export interface Bridge {
    IPAMConfig?: any;
    Links?: any;
    Aliases?: any;
    NetworkID: string;
    EndpointID: string;
    Gateway: string;
    IPAddress: string;
    IPPrefixLen: number;
    IPv6Gateway: string;
    GlobalIPv6Address: string;
    GlobalIPv6PrefixLen: number;
    MacAddress: string;
  }

  export interface Networks {
    bridge: Bridge;
  }

  export interface NetworkSettings {
    Networks: Networks;
  }

  export interface IDocker {
    Id: string;
    Names: string[];
    Image: string;
    ImageID: string;
    Command: string;
    Created: number;
    Ports: Port[];
    Labels: Labels;
    State: string;
    Status: string;
    HostConfig: HostConfig;
    NetworkSettings: NetworkSettings;
    Mounts: any[];
    Name: string;


  }

}


export class Docker implements IDocker {
  Id: string;
  Names: string[];
  Image: string;
  ImageID: string;
  Command: string;
  Created: number;
  Ports: DockerDtoModule.Port[];
  Labels: DockerDtoModule.Labels;
  State: string;
  Status: string;
  HostConfig: DockerDtoModule.HostConfig;
  NetworkSettings: DockerDtoModule.NetworkSettings;
  Mounts: any[];
  Name: string;

  rawJson: string;


  constructor(id: string,
              names: string[],
              image: string,
              imageID: string,
              command: string,
              created: number,
              ports: Port[],
              labels: Labels,
              state: string,
              status: string,
              hostConfig: HostConfig,
              networkSettings: NetworkSettings,
              mounts: any[],
              name: string,
              rawJson?: string) {
    this.Id = id;
    this.Names = names;
    this.Image = image;
    this.ImageID = imageID;
    this.Command = command;
    this.Created = created;
    this.Ports = ports;
    this.Labels = labels;
    this.State = state;
    this.Status = status;
    this.HostConfig = hostConfig;
    this.NetworkSettings = networkSettings;
    this.Mounts = mounts;
    this.Name = name;
    if (rawJson) {
      this.rawJson = rawJson;
    }
  }


  static fromJson(json: string) {
    var data = JSON.parse(JSON.stringify(json));
    return new Docker(data.Id, data.Names, data.Image, data.ImageID, data.Command, data.Created, data.Ports, data.Labels, data.State, data.Status, data.HostConfig, data.NetworkSettings, data.Mounts, data.Name , JSON.stringify(data));
  }

  public toString = () : string => {
    return this.rawJson;
  }


}

