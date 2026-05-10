// Facade 패턴
class MembershipChecker {
  checkMembership(userId) {
    // 회원 여부를 판단
    const isMember = true; // 회원 여부를 적절히 판단, 초기화
    return isMember;
  }
}


class MembershipFacade {
  constructor() {
    this.checker = new MembershipChecker();
  }

  isMember(userId) {
    return this.checker.checkMembership(userId);
  }
}

// Observer 패턴
class Subject {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  notifyObservers() {
    for (const observer of this.observers) {
      observer.update();
    }
  }
}

class MusicPlayer extends Subject {
  constructor() {
    super();
    this.isPlaying = false;
  }

  play() {
    // 음악 재생 로직
    this.isPlaying = true;
    this.notifyObservers();
  }

  stop() {
    // 음악 정지 로직
    this.isPlaying = false;
    this.notifyObservers();
  }
}

class UI {
  constructor(musicPlayer) {
    this.musicPlayer = musicPlayer;
    this.musicPlayer.addObserver(this);
  }

  update() {
    // UI 업데이트 로직
    if (this.musicPlayer.isPlaying) {
      console.log('UI: 음악이 재생 중입니다.');
    } else {
      console.log('UI: 음악이 정지되었습니다.');
    }
  }
}

// Factory 패턴
class MusicDecoderFactory {
  createDecoder(format) {
    let decoder;

    if (format === 'mp3') {
      decoder = new Mp3Decoder();
    } else if (format === 'wav') {
      decoder = new WavDecoder();
    } else {
      throw new Error('Unsupported music format');
    }

    return decoder;
  }
}

class Mp3Decoder {
  decode(file) {
    console.log(`Decoding MP3 file: ${file}`);
    // MP3 디코딩 로직
  }
}

class WavDecoder {
  decode(file) {
    console.log(`Decoding WAV file: ${file}`);
    // WAV 디코딩 로직
  }
}

// Composite 패턴
class Playlist {
  constructor(name) {
    this.name = name;
    this.songs = [];
  }

  add(song) {
    this.songs.push(song);
  }

  remove(song) {
    const index = this.songs.indexOf(song);
    if (index !== -1) {
      this.songs.splice(index, 1);
    }
  }

  play() {
    console.log(`Playing playlist: ${this.name}`);
    for (const song of this.songs) {
      song.play();
    }
  }
}

class Song {
  constructor(name) {
    this.name = name;
  }

  play() {
    console.log(`Playing song: ${this.name}`);
  }
}

// 실행 예시
const userId = 'user123'; // userId 변수 정의

const membershipFacade = new MembershipFacade();
const isMember = membershipFacade.isMember(userId);
console.log(`회원 여부: ${isMember}`);

const musicPlayer = new MusicPlayer();
const ui = new UI(musicPlayer);

musicPlayer.play();
musicPlayer.stop();

const factory = new MusicDecoderFactory();

const mp3Decoder = factory.createDecoder('mp3');
mp3Decoder.decode('music.mp3');

const wavDecoder = factory.createDecoder('wav');
wavDecoder.decode('music.wav');

const playlist1 = new Playlist('Playlist 1');
const playlist2 = new Playlist('Playlist 2');

const song1 = new Song('Song 1');
const song2 = new Song('Song 2');
const song3 = new Song('Song 3');

playlist1.add(song1);
playlist1.add(song2);
playlist2.add(song3);

playlist1.play();
playlist2.play();

  
