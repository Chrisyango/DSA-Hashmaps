'use strict';

class HashMap {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._slots[index] === undefined) {
      throw new Error('Key error');
    }
    return this._slots[index].value;
  }

  set(key, value) {
    const loadRatio = (this.length + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }

    const index = this._findSlot(key);
    this._slots[index] = {
      key, value
    };
    this.length++;
  }

  remove(key) {
    const index = this._findSlot(key);
    const slot = this._slots[index];
    if (slot === undefined) {
      throw new Error('Key error');
    }
    slot.deleted = true;
    this.length--;
    this._deleted++;
  }

  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;

    for (let i = start; i < start + this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._slots[index];
      if (slot === undefined || (slot.key == key && !slot.deleted)) {
        return index;
      }
    }
  }

  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;
    this.length = 0;
    this.deleted = 0;
    this._slots = [];

    for (const slot of oldSlots) {
      if (slot !== undefined) {
        this.set(slot.key, slot.value);
      }
    }
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
}

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

/*========== Any Permutation a Palindrom =========*/
function uniqueChars(string) {
  const chars = [];
  for (let i = 0; i < string.length; i++) {
    if (!(chars.includes(string[i]))) {
      chars.push(string[i]);
    }
  }
  return chars;
}

function permutationPalindrome(string) {
  const chars = uniqueChars(string);
  const palindrome = new HashMap;
  let count = 0;

  for (let i = 0; i < string.length; i++) {
    palindrome.set(string[i], 0);
  }

  for (let i = 0; i < string.length; i++) {
    palindrome.set(string[i], (palindrome.get(string[i]) + 1));
  }

  for (let i = 0; i < chars.length; i++) {
    if (palindrome.get(chars[i]) % 2 !== 0) {
      count++;
    }
  }

  return count < 2;
}

function main() {
  const lor = new HashMap;

  lor.set('Hobbit', 'Bilbo');
  lor.set('Hobbit', 'Frodo');
  lor.set('Wizard', 'Gandolf');
  lor.set('Human', 'Aragon');
  lor.set('Elf', 'Legolas');
  lor.set('Maiar', 'The Necromancer');
  lor.set('Maiar', 'Sauron');
  lor.set('RingBearer', 'Gollum');
  lor.set('LadyOfLight', 'Galadriel');
  lor.set('HalfElven', 'Arwen');
  lor.set('Ent', 'Treebeard');

  // console.log(lor);
  // console.log(lor.get('Maiar'));

  console.log(permutationPalindrome('raceeecar'));
}

main();

