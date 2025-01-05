export class StoreUtils {

  static normalize(entityArray: Entity[]) {
    return entityArray.reduce((previousValue, currentValue) => {
      return {...previousValue, ...{[currentValue._id]: currentValue}};
    }, {});
  }

  static unNormalize(entities: { [_id: string]: any }) {
    if (!entities) {
      return []
    }else{
      return Object.keys(entities).map(key => entities[key]);
    }
  }

  static filterDuplicateIds(ids: string[]) {
    return ids.filter((elem, index, self) => index === self.indexOf(elem));
  }

  static removeKeys(entities: { [_id: string] : any }, id: string) {
    const newObject = {...entities};
    delete newObject[id]
    return newObject;
  }

}

interface Entity {
  _id: any;
}
