export class Persister {
  private tab: string | null = null;

  constructor(private readonly storage: Storage = localStorage) {}

  public setTab(tab: string | null): void {
    this.tab = tab;
  }

  //   private async getTabObject(): Promise<Record<string, any>> {
  //     if (this.tab) {
  //       const value = this.storage.getItem(this.tab);
  //       if (value) return JSON.parse(value);
  //       else {
  //         const newObject = {};
  //         this.setTabObject(newObject);
  //         return newObject;
  //       }
  //     } else throw TAB_ERROR;
  //   }

  //   private async setTabObject(tabObject: Record<string, any>): Promise<void> {
  //     if (this.tab) this.storage.setItem(this.tab, JSON.stringify(tabObject));
  //     else throw TAB_ERROR;
  //   }

  private getKey(key: string, pure: boolean): string {
    if (!pure && this.tab) return `${this.tab}-${key}`;
    return key;
  }

  public async save(key: string, value: any, pure = false): Promise<void> {
    await this.storage.setItem(this.getKey(key, pure), JSON.stringify(value));
  }

  public async load<T>(key: string, pure = false): Promise<T | null> {
    const value = await this.storage.getItem(this.getKey(key, pure));
    if (value) return JSON.parse(value) as T;
    else return null;
  }

  public async remove(key: string, pure = false): Promise<void> {
    await this.storage.removeItem(this.getKey(key, pure));
  }
}

const globalPersister = new Persister();

export default globalPersister;
