import { DockerMapPipe } from './docker-map.pipe';

describe('DockerMapPipe', () => {
  it('create an instance', () => {
    const pipe = new DockerMapPipe();
    expect(pipe).toBeTruthy();
  });
});
