# music-service-design-patterns

> JavaScript 디자인 패턴 실습 — 음악 서비스 도메인 기반 Facade · Observer · Factory · Composite 패턴 구현

음악 스트리밍 서비스를 도메인으로 삼아 4가지 GoF 디자인 패턴을 JavaScript로 구현한 실습 프로젝트입니다.

---

## 사용 기술

- JavaScript (ES6+)
- GoF 디자인 패턴 (Facade, Observer, Factory, Composite)

---

## 구현 패턴

| 패턴 | 적용 위치 | 역할 |
|------|----------|------|
| **Facade** | `MembershipFacade` | 복잡한 회원 인증 로직을 단일 인터페이스로 은폐 |
| **Observer** | `MusicPlayer` ↔ `UI` | 재생 상태 변화를 UI에 자동 전파 |
| **Factory** | `MusicDecoderFactory` | MP3/WAV 포맷에 맞는 디코더 객체 생성 |
| **Composite** | `Playlist` + `Song` | 단일 곡과 플레이리스트를 동일 인터페이스로 처리 |

---

## 배운 점

패턴 이름을 외우는 것과 실제로 코드에 적용하는 것이 전혀 다른 일임을 느꼈습니다. Observer 패턴을 구현하면서 `addObserver` / `notifyObservers` 흐름이 자바스크립트 이벤트 리스너 구조와 본질적으로 같다는 것을 이해하게 됐습니다.

Factory 패턴은 조건 분기(if/else)를 객체 생성 로직 안에 캡슐화함으로써 호출 측 코드가 포맷에 무관하게 작동한다는 점에서 개방-폐쇄 원칙(OCP)과 연결되는 개념임을 체감했습니다.

---

## 어려웠던 점

Composite 패턴에서 `Playlist`와 `Song`이 같은 `play()` 인터페이스를 구현하게 설계하는 부분이 가장 어려웠습니다. 단일 객체와 복합 객체를 동일하게 취급한다는 개념이 처음에는 직관적이지 않았는데, 파일 시스템의 파일과 폴더 관계로 비유하고 나서야 이해가 됐습니다.

---

## 현재 문제점

- **인터페이스 강제 없음**: JavaScript는 인터페이스가 없어 `Observer` 구현체가 `update()` 메서드를 반드시 가져야 한다는 계약이 코드로 표현되지 않습니다. TypeScript로 작성했다면 `interface Observer { update(): void }` 로 컴파일 타임에 강제할 수 있었을 것입니다.
- **Facade의 단순화 수준**: `MembershipFacade`가 `MembershipChecker` 하나만 감싸고 있어 실질적인 복잡도 은폐 효과가 없습니다. 실제 서비스에서는 인증, 권한, 구독 상태 조회 등 여러 서브시스템을 묶어야 Facade의 의미가 살아납니다.
- **에러 처리 없음**: `MusicDecoderFactory`에서 지원하지 않는 포맷이 들어올 때 `Error`를 throw하지만, 호출 측에서 try-catch가 없어 런타임 오류가 그대로 노출됩니다.
- **단일 파일 구조**: 4가지 패턴이 `patterns.js` 한 파일에 모두 작성되어 있어, 패턴별 모듈 분리와 테스트가 불가능합니다.

## 고민해야 할 점

- **패턴 선택 기준**: 특정 문제에 어떤 패턴이 적합한지 판단하는 기준이 아직 불분명합니다. Observer 대신 이벤트 이미터(EventEmitter)를 쓰는 것과 차이가 무엇인지, 패턴이 라이브러리 추상화보다 명시적인 경우는 언제인지 더 공부가 필요합니다.
- **TypeScript 도입 효과**: JavaScript 디자인 패턴은 인터페이스나 추상 클래스가 없어 패턴의 계약이 암묵적으로 남습니다. TypeScript를 쓰면 인터페이스와 추상 클래스로 패턴 구조를 명시적으로 표현할 수 있는데, 그 차이가 얼마나 실질적인 유지보수 이점을 주는지 직접 비교해보고 싶습니다.
- **패턴과 프레임워크의 관계**: React의 Context API는 Observer 패턴, NestJS의 Provider는 Factory/DI 패턴을 내재화한 것입니다. 직접 패턴을 구현해보고 나니 프레임워크가 내부에서 어떤 원리로 동작하는지 더 잘 보이는 것 같습니다.

## 아쉬운 점 및 개선 방향

- 패턴별로 파일을 분리하고 Jest로 단위 테스트를 작성하면 각 패턴의 동작을 독립적으로 검증할 수 있을 것 같습니다.
- TypeScript로 재작성해서 인터페이스와 추상 클래스로 패턴 구조를 명시적으로 표현해보는 것이 다음 목표입니다.

---

## 추가로 공부해야 할 내용

- GoF 23가지 패턴 전체 개요
- TypeScript 인터페이스 / 추상 클래스
- SOLID 원칙과 디자인 패턴의 연관성
- Node.js EventEmitter vs Observer 패턴 비교
- Jest를 활용한 디자인 패턴 단위 테스트
