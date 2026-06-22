import { computed, Injectable, signal } from '@angular/core';
import { Observable, interval, Subject, takeUntil, BehaviorSubject, map, Subscription } from 'rxjs';
import {
  ChatMessage,
  ChatResponseDto,
<<<<<<< HEAD
  
  CountryChatRequestDto,
=======
  CityChatRequestDto,
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  CrossComparisionChatRequestDto,
  GlobalChatRequestDto,

} from '../models/chat/ChatMessage';
import { UserService } from './user.service';

import { PillarsVM } from '../models/PillersVM';
import { HttpService } from '../http/http.service';
import { ToasterService } from './toaster.service';
import { ResultResponseDto } from '../models/ResultResponseDto';
import { AIAssistantFAQDto } from '../models/chat/AIAssistantFAQDto';
<<<<<<< HEAD
import { CountryVM } from '../models/CountryVM';
import {  ChatCountryExecutiveSlidesResponse } from '../models/chat/ChatCountryExecutiveSlidesResponse';
=======
import { CityVM } from '../models/CityVM';
import { ChatCityExecutiveSlidesResponse, CityExecutiveSlidesResult } from '../models/chat/ChatCityExecutiveSlidesResponse';
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
import { ChatEmergingTrendsResponse } from '../models/chat/EmergingTrendsResponse';
import { PillarLiveSignalsResult } from '../models/chat/PillarLiveSignalsResponse';

@Injectable({ providedIn: 'root' })
export class ChatService {
  // ─── State ────────────────────────────────────────────────────────────────
  isOpen = signal(false);
  isTyping = signal(false);
<<<<<<< HEAD
  selectedCountry = signal<CountryVM | null>(null);
  selectedPillar = signal<PillarsVM | null>(null);
  messages = signal<ChatMessage[]>([]);
  countries = new BehaviorSubject<CountryVM[]>([]);
  pillars = new BehaviorSubject<PillarsVM[]>([]);
  faqs = new BehaviorSubject<AIAssistantFAQDto[]>([]);
  selectedfaq = signal<AIAssistantFAQDto | null>(null);
   crossComparisionCountryIDs = new BehaviorSubject<number[]>([]);
  quickQuestions = computed(() => this.selectedCountry() ? this.countryQuickQuestions : this.globalQuickQuestions);
=======
  selectedCity = signal<CityVM | null>(null);
  selectedPillar = signal<PillarsVM | null>(null);
  messages = signal<ChatMessage[]>([]);
  cities = new BehaviorSubject<CityVM[]>([]);
  pillars = new BehaviorSubject<PillarsVM[]>([]);
  faqs = new BehaviorSubject<AIAssistantFAQDto[]>([]);
  selectedfaq = signal<AIAssistantFAQDto | null>(null);
   crossComparisionCityIDs = new BehaviorSubject<number[]>([]);
  quickQuestions = computed(() => this.selectedCity() ? this.cityQuickQuestions : this.globalQuickQuestions);
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  // ─── Cancellation tokens ──────────────────────────────────────────────────
  /**
   * Emitting on cancelStream$ stops an active typewriter interval via takeUntil.
   * A new Subject is created per sendMessage() call so old ones don't interfere.
   */
  private cancelStream$ = new Subject<void>();
  /**
   * Holds the active HTTP subscription so it can be aborted before the API
   * responds (the "API in flight" path in the cancel flow).
   */
  private activeRequest$: Subscription | null = null;
  /**
   * Keeps the full text that the backend returned so that stopGeneration()
   * can flush it instantly instead of discarding the answer.
   */
  private pendingFullText = '';
  private pendingAssistantId = '';

  // ─── Welcome message ──────────────────────────────────────────────────────
  private readonly welcomeMessage: ChatMessage = {
    id: 'welcome',
    role: 'assistant',
<<<<<<< HEAD
    content: `## Welcome to Africa Health Intelligence \n\nI'm your **Urban Intelligence Assistant**. I can help you analyze:\n\n- **Country index scores** \n- **Pillar-level breakdowns** and risk factors\n- **Trends and recommendations**\n\nSelect a **country** and **pillar** above for focused insights, or ask me anything!`,
=======
    content: `## Welcome to Verdian Urban Index\n\nI'm your **Urban Intelligence Assistant**. I can help you analyze:\n\n- **City index scores** \n- **Pillar-level breakdowns** and risk factors\n- **Trends and recommendations**\n\nSelect a **city** and **pillar** above for focused insights, or ask me anything!`,
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
    timestamp: new Date(),
  };

  constructor(
    private http: HttpService,
    private userService: UserService,
    private toaster: ToasterService,
  ) {
    this.messages.set([this.welcomeMessage]);
  }

  // ─── Public API ───────────────────────────────────────────────────────────

<<<<<<< HEAD
  openWithContext(country?: CountryVM, pillar?: PillarsVM): void {
    if (country) this.selectedCountry.set(country);
=======
  openWithContext(city?: CityVM, pillar?: PillarsVM): void {
    if (city) this.selectedCity.set(city);
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
    if (pillar) this.selectedPillar.set(pillar);
    this.isOpen.set(true);
  }

  toggleOpen(): void { this.isOpen.update(v => !v); }
  closeChat(): void { this.isOpen.set(false); }
  clearHistory(): void { this.messages.set([this.welcomeMessage]); }
  /**
   * Stop any active generation immediately.
   *
   * Two cases handled:
   *  1. API still in flight → abort the HTTP request, show a cancelled notice.
   *  2. Typewriter animation running → flush the full response text instantly.
   */
  stopGeneration(): void {
    if (!this.isTyping()) return;

    if (this.activeRequest$ && !this.activeRequest$.closed) {
      // ── Case 1: API hasn't responded yet ──────────────────────────────────
      this.activeRequest$.unsubscribe();
      this.activeRequest$ = null;

      this.updateAssistantMessage(
        this.pendingAssistantId,
        '_Stopped._',
        false,
      );
      this.finalizeMessage(this.pendingAssistantId);
      this.isTyping.set(false);
    } else {
      // ── Case 2: Typewriter animation is running ───────────────────────────
      // Emit cancel so takeUntil inside typewriterStream() tears down the interval.
      this.cancelStream$.next();

      // Flush whatever text the backend returned (already stored in pendingFullText).
      if (this.pendingAssistantId) {
        this.updateAssistantMessage(this.pendingAssistantId, this.pendingFullText, false);
        this.finalizeMessage(this.pendingAssistantId);
      }
      this.isTyping.set(false);
    }

    // Reset pending state
    this.pendingFullText = '';
    this.pendingAssistantId = '';
  }

  /** Return top-4 predefined question matches for a user query. */
  filterQuestions(query: string): AIAssistantFAQDto[] {
    if (!query || query.trim().length < 2) return [];
    const q = query.toLowerCase();
<<<<<<< HEAD
    if (this.selectedCountry()) {
=======
    if (this.selectedCity()) {
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
      return this.faqs.value
        .filter(pq => pq.questionText.toLowerCase().includes(q) && !pq.related.includes('global'))
        .slice(0, 4);
    } else {
      return this.faqs.value
        .filter(pq => pq.questionText.toLowerCase().includes(q) && pq.related.includes('global'))
        .slice(0, 4);
    }
  }

  /**
   * Send a user message and return an Observable that emits growing streamed text.
   *
   * Calling this while a previous message is still generating will automatically
   * call stopGeneration() first, so the UI never has two concurrent streams.
   */
  sendMessage(userText: string): Observable<string> {
    // Auto-cancel any in-progress generation before starting a new one.
    if (this.isTyping()) {
      this.stopGeneration();
    }

    // New cancel token per message
    this.cancelStream$ = new Subject<void>();

<<<<<<< HEAD
    const country = this.selectedCountry();
=======
    const city = this.selectedCity();
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
    const pillar = this.selectedPillar();
    const histories = this.messages()
      .slice(1)
      .slice(-3)
      .map(msg => {
        const content =
          msg.content.length > 200
            ? msg.content.substring(0, 200) + '...'
            : msg.content;

        return `${msg.role}: ${content}`;
      }).join('\n');

    // Add user message
    const userMsg: ChatMessage = {
      id: this.uid(),
      role: 'user',
      content: userText,
      timestamp: new Date(),
    };
    this.messages.update(msgs => [...msgs, userMsg]);
    this.isTyping.set(true);

    return new Observable<string>(observer => {
      const assistantId = this.uid();
      this.pendingAssistantId = assistantId;

      const placeholder: ChatMessage = {
        id: assistantId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        isStreaming: true,
      };
      this.messages.update(msgs => [...msgs, placeholder]);

<<<<<<< HEAD
      if (country) {
        const payload: CountryChatRequestDto = {
          countryID: country.countryID,
=======
      if (city) {
        const payload: CityChatRequestDto = {
          cityID: city.cityID,
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
          pillarID: pillar?.pillarID ?? 0,
          questionText: userText,
          fAQID: this.selectedfaq()?.faqid,
          historyText: histories,
        };

<<<<<<< HEAD
        this.activeRequest$ = this.askAboutCountry(payload).subscribe({
=======
        this.activeRequest$ = this.askAboutCity(payload).subscribe({
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
          next: res => {
            this.activeRequest$ = null; // HTTP done; typewriter phase begins

            if (res.succeeded) {
              const fullText = res.result?.responseText ?? '';
              this.pendingFullText = fullText;
              this.typewriterStream(fullText, assistantId, observer);
            } else {
              this.handleError(assistantId, observer, res.errors?.join(', ') ?? 'Unknown error');
            }
          },
          error: () => {
            this.activeRequest$ = null;
            this.handleError(assistantId, observer, 'Request failed. Please try again.');
          },
        });
      } else {
        const payload: GlobalChatRequestDto = {
          questionText: userText,
          fAQID: this.selectedfaq()?.faqid,
          historyText: histories,
        };

        this.activeRequest$ = this.askGlobalQuestion(payload).subscribe({
          next: res => {
            this.activeRequest$ = null; // HTTP done; typewriter phase begins

            if (res.succeeded) {
              const fullText = res.result?.responseText ?? '';
              this.pendingFullText = fullText;
              this.typewriterStream(fullText, assistantId, observer);
            } else {
              this.handleError(assistantId, observer, res.errors?.join(', ') ?? 'Unknown error');
            }
          },
          error: () => {
            this.activeRequest$ = null;
            this.handleError(assistantId, observer, 'Request failed. Please try again.');
          },
        });
      }
    });
  }

  // ─── Data fetches ─────────────────────────────────────────────────────────

  getFAQDs(): void {
    if (this.faqs.value.length > 0) return;
    this.getAssistantFAQDs().subscribe({
      next: res => this.faqs.next(res.result ?? []),
    });
  }

<<<<<<< HEAD
  getAllCountries(): void {
    if (this.countries.value.length > 0) return;
    this.getAllCountriesByUserId(this.userService?.userInfo?.userID).subscribe({
      next: res => this.countries.next(res.result ?? []),
=======
  getAllCites(): void {
    if (this.cities.value.length > 0) return;
    this.getAllCitiesByUserId(this.userService?.userInfo?.userID).subscribe({
      next: res => this.cities.next(res.result ?? []),
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
    });
  }

  getPillars(): void {
    if (this.pillars.value.length > 0) return;
    this.getAllPillars().subscribe({
      next: res => this.pillars.next(res ?? []),
    });
  }


<<<<<<< HEAD
  getCountrySlides(
    countryId: number
  ): Observable<ResultResponseDto<ChatCountryExecutiveSlidesResponse>> {

    return this.http.post<ResultResponseDto<ChatCountryExecutiveSlidesResponse>>(
      `Chat/countrySlides`,
      countryId as any
=======
  getCitySlides(
    cityId: number
  ): Observable<ResultResponseDto<ChatCityExecutiveSlidesResponse>> {

    return this.http.post<ResultResponseDto<ChatCityExecutiveSlidesResponse>>(
      `Chat/citySlides`,
      cityId as any
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
    );
  }



  // ─── Private helpers ──────────────────────────────────────────────────────

  private typewriterStream(
    fullText: string,
    assistantId: string,
    observer: { next(v: string): void; complete(): void },
  ): void {
    let i = 0;
    const speed = 8; // ms per character

    interval(speed)
      .pipe(takeUntil(this.cancelStream$)) // ← torn down by stopGeneration()
      .subscribe({
        next: () => {
          i++;
          const chunk = fullText.substring(0, i);
          this.updateAssistantMessage(assistantId, chunk, true);
          observer.next(chunk);

          if (i >= fullText.length) {
            this.cancelStream$.next();   // self-complete
            this.finalizeMessage(assistantId);
            this.isTyping.set(false);
            this.pendingFullText = '';
            this.pendingAssistantId = '';
            observer.complete();
          }
        },
      });
  }

  private handleError(
    assistantId: string,
    observer: { next(v: string): void; complete(): void },
    message: string,
  ): void {
    this.toaster.showError(message);
    this.updateAssistantMessage(assistantId, `⚠️ ${message}`, false);
    this.finalizeMessage(assistantId);
    this.isTyping.set(false);
    this.pendingFullText = '';
    this.pendingAssistantId = '';
    observer.complete();
  }

  private updateAssistantMessage(id: string, content: string, isStreaming: boolean): void {
    this.messages.update(msgs =>
      msgs.map(m => m.id === id ? { ...m, content, isStreaming } : m)
    );
  }

  private finalizeMessage(id: string): void {
    this.messages.update(msgs =>
      msgs.map(m => m.id === id ? { ...m, isStreaming: false } : m)
    );
  }

  private uid(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  }


  // ─── HTTP ─────────────────────────────────────────────────────────────────

<<<<<<< HEAD
  private getAllCountriesByUserId(userId: number) {
    return this.http
      .get(`Country/getAllCountryByUserId/${userId}`)
      .pipe(map(x => x as ResultResponseDto<CountryVM[]>));
=======
  private getAllCitiesByUserId(userId: number) {
    return this.http
      .get(`City/getAllCityByUserId/${userId}`)
      .pipe(map(x => x as ResultResponseDto<CityVM[]>));
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  }

  private getAllPillars() {
    return this.http
      .get('Pillar/Pillars')
      .pipe(map(x => x as PillarsVM[]));
  }

  private getAssistantFAQDs() {
    return this.http
      .get('chat/getAssistantFAQDs')
      .pipe(map(x => x as ResultResponseDto<AIAssistantFAQDto[]>));
  }

<<<<<<< HEAD
  private askAboutCountry(request: CountryChatRequestDto) {
    return this.http
      .post('chat/askAboutCountry', request)
=======
  private askAboutCity(request: CityChatRequestDto) {
    return this.http
      .post('chat/askAboutCity', request)
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
      .pipe(map(x => x as ResultResponseDto<ChatResponseDto>));
  }

  private askGlobalQuestion(request: GlobalChatRequestDto) {
    return this.http
      .post('chat/askglobalQuestion', request)
      .pipe(map(x => x as ResultResponseDto<ChatResponseDto>));
  }
<<<<<<< HEAD
  countryQuickQuestions = [
    {
      label: 'Overview',
      question: 'Provide an overall summary of this country’s current performance in the Africa Health Intelligence .'
    },
    {
      label: 'Strengths',
      question: 'What are the major strengths and positive developments observed in this country across urban development indicators?'
    },
    {
      label: 'Challenges',
      question: 'What are the most critical urban challenges or risks currently affecting this country?'
=======
  cityQuickQuestions = [
    {
      label: 'Overview',
      question: 'Provide an overall summary of this city’s current performance in the Veridian Urban Index.'
    },
    {
      label: 'Strengths',
      question: 'What are the major strengths and positive developments observed in this city across urban development indicators?'
    },
    {
      label: 'Challenges',
      question: 'What are the most critical urban challenges or risks currently affecting this city?'
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
    },
        
    {
      label: 'Governance & capacity',
<<<<<<< HEAD
      question: 'How effective are the country’s governance systems, institutional capacity, and implementation mechanisms?'
    },
    {
      label: 'Equity & sustainability',
      question: 'How does this country perform in terms of inclusiveness, sustainability, and long-term urban resilience?'
=======
      question: 'How effective are the city’s governance systems, institutional capacity, and implementation mechanisms?'
    },
    {
      label: 'Equity & sustainability',
      question: 'How does this city perform in terms of inclusiveness, sustainability, and long-term urban resilience?'
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
    }
  ];


  // Questions for all countries globally
  globalQuickQuestions = [
    {
      label: 'Overview',
<<<<<<< HEAD
      question: 'Provide a global overview of recent trends and performance across countries in the Africa Health Intelligence .'
    },
    {
      label: 'Top countries',
      question: 'Which countries are currently demonstrating the strongest overall performance across urban development indicators?'
    },
    {
      label: 'Critical risks',
      question: 'What are the most significant urban risks and challenges currently affecting countries globally?'
=======
      question: 'Provide a global overview of recent trends and performance across cities in the Veridian Urban Index.'
    },
    {
      label: 'Top cities',
      question: 'Which cities are currently demonstrating the strongest overall performance across urban development indicators?'
    },
    {
      label: 'Critical risks',
      question: 'What are the most significant urban risks and challenges currently affecting cities globally?'
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
    },
    
    {
      label: 'Most improved',
<<<<<<< HEAD
      question: 'Which countries have shown the greatest improvement in their Africa Health Intelligence  performance recently?'
    },
    {
      label: 'High-risk',
      question: 'Which countries are currently facing the highest levels of urban vulnerability, governance challenges, or sustainability risks?'
    },
    {
      label: 'Urban trends',
      question: 'What are the latest global urban development trends, cross-country patterns, and emerging priorities?'
=======
      question: 'Which cities have shown the greatest improvement in their Veridian Urban Index performance recently?'
    },
    {
      label: 'High-risk',
      question: 'Which cities are currently facing the highest levels of urban vulnerability, governance challenges, or sustainability risks?'
    },
    {
      label: 'Urban trends',
      question: 'What are the latest global urban development trends, cross-city patterns, and emerging priorities?'
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
    }
    
  ];

<<<<<<< HEAD
  getCountriesCrossComparision() {
    let userText = "Provide a detailed comparative analysis of the selected countries across all urban performance pillars, including key risks, development opportunities, structural vulnerabilities, resilience indicators, emerging urban trends, and strategic observations for each pillar."
=======
  getCitiesCrossComparision() {
    let userText = "Provide a detailed comparative analysis of the selected cities across all urban performance pillars, including key risks, development opportunities, structural vulnerabilities, resilience indicators, emerging urban trends, and strategic observations for each pillar."
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1

    if (this.isTyping()) {
      this.stopGeneration();
    }

    this.cancelStream$ = new Subject<void>();

    const histories = this.messages()
      .slice(1)
      .slice(-3)
      .map(msg => {
        const content =
          msg.content.length > 200
            ? msg.content.substring(0, 200) + '...'
            : msg.content;

        return `${msg.role}: ${content}`;
      }).join('\n');

    // Add user message
    const userMsg: ChatMessage = {
      id: this.uid(),
      role: 'user',
      content: userText,
      timestamp: new Date(),
    };
    this.messages.update(msgs => [...msgs, userMsg]);
    this.isTyping.set(true);

    return new Observable<string>(observer => {
      const assistantId = this.uid();
      this.pendingAssistantId = assistantId;

      const placeholder: ChatMessage = {
        id: assistantId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        isStreaming: true,
      };

      this.messages.update(msgs => [...msgs, placeholder]);

<<<<<<< HEAD
      if (this.crossComparisionCountryIDs.value.length > 0) {
        const payload: CrossComparisionChatRequestDto = {
          countryIDs: this.crossComparisionCountryIDs.value,
=======
      if (this.crossComparisionCityIDs.value.length > 0) {
        const payload: CrossComparisionChatRequestDto = {
          cityIDs: this.crossComparisionCityIDs.value,
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
          questionText: userText,
          historyText: histories,
        };

        this.activeRequest$ = this.crossComparisionquestion(payload).subscribe({
          next: res => {
            this.activeRequest$ = null; // HTTP done; typewriter phase begins

            if (res.succeeded) {
              const fullText = res.result?.responseText ?? '';
              this.pendingFullText = fullText;
              this.typewriterStream(fullText, assistantId, observer);
            } else {
              this.handleError(assistantId, observer, res.errors?.join(', ') ?? 'Unknown error');
            }
          },
          error: () => {
            this.activeRequest$ = null;
            this.handleError(assistantId, observer, 'Request failed. Please try again.');
          },
        });
      }
    });
  }

  private crossComparisionquestion(request: CrossComparisionChatRequestDto) {
    return this.http
      .post('chat/crossComparision', request)
      .pipe(map(x => x as ResultResponseDto<ChatResponseDto>));
  }

   getEmergingTrendsAndIssues(cityCount = 6): Observable<ResultResponseDto<ChatEmergingTrendsResponse>> {
    return this.http
      .getWithQueryParams('Public/emergingTrendsAndIssues', { cityCount })
      .pipe(map(x => x as ResultResponseDto<ChatEmergingTrendsResponse>));
  }

  getPillarLiveSignals(): Observable<ResultResponseDto<PillarLiveSignalsResult>> {
    return this.http
      .get('Public/pillarLiveSignals')
      .pipe(map(x => x as ResultResponseDto<PillarLiveSignalsResult>));
  }
}