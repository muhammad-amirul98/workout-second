package com.workout.config;

import com.workout.repository.*;
import com.workout.service.Assistant;
import com.workout.service.impl.UserServiceImpl;
import com.workout.service.impl.WorkoutServiceImpl;
import dev.langchain4j.data.document.loader.FileSystemDocumentLoader;
import dev.langchain4j.data.document.parser.TextDocumentParser;
import dev.langchain4j.data.document.splitter.DocumentSplitters;
import dev.langchain4j.data.segment.TextSegment;
import dev.langchain4j.memory.chat.ChatMemoryProvider;
import dev.langchain4j.memory.chat.MessageWindowChatMemory;
import dev.langchain4j.memory.chat.TokenWindowChatMemory;
import dev.langchain4j.model.Tokenizer;
import dev.langchain4j.model.chat.ChatLanguageModel;
import dev.langchain4j.model.chat.StreamingChatLanguageModel;
import dev.langchain4j.model.embedding.EmbeddingModel;
import dev.langchain4j.model.openai.*;
import dev.langchain4j.rag.content.retriever.ContentRetriever;
import dev.langchain4j.rag.content.retriever.EmbeddingStoreContentRetriever;
import dev.langchain4j.service.AiServices;
import dev.langchain4j.store.embedding.EmbeddingStore;
import dev.langchain4j.store.embedding.EmbeddingStoreIngestor;
import dev.langchain4j.store.embedding.inmemory.InMemoryEmbeddingStore;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ResourceLoader;

@Configuration
@AllArgsConstructor
public class AIConfig {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final AddressRepository addressRepository;

    @Bean
    public Assistant assistant() {
        return AiServices.builder(Assistant.class)
                .tools(new UserServiceImpl(userRepository, jwtProvider, addressRepository)

                )
                .chatLanguageModel(chatLanguageModel())
                .chatMemoryProvider(memoryId -> MessageWindowChatMemory.withMaxMessages(10))
                .build();
    }

    @Bean
    public ChatLanguageModel chatLanguageModel() {
        return OpenAiChatModel.builder().
                baseUrl("http://langchain4j.dev/demo/openai/v1").
                modelName(OpenAiChatModelName.GPT_4_O_MINI).
                temperature(0.7).
                logRequests(true).
                logResponses(true).
                build();
    }

    @Bean
    ApplicationRunner applicationRunner (
            EmbeddingModel embeddingModel,
            EmbeddingStore<TextSegment> embeddingStore,
            Tokenizer tokenizer,
            ResourceLoader resourceLoader
    ){
        return args -> {
            var resource = resourceLoader.getResource("classpath:terms.txt");
            var doc = FileSystemDocumentLoader.loadDocument(resource.getFile().toPath(), new TextDocumentParser());
            var ingestor = EmbeddingStoreIngestor.builder()
                    .documentSplitter(DocumentSplitters.recursive(50, 0, tokenizer))
                    .embeddingStore(embeddingStore)
                    .embeddingModel(embeddingModel)
                    .build();
            ingestor.ingest();
        };
    }

    @Bean
    ContentRetriever contentRetriever (
            EmbeddingModel embeddingModel,
            EmbeddingStore<TextSegment> embeddingStore
    ) {
        return EmbeddingStoreContentRetriever.builder()
                .embeddingModel(embeddingModel)
                .embeddingStore(embeddingStore)
                .maxResults(2)
                .minScore(0.6)
                .build();
    }

    @Bean
    public EmbeddingModel embeddingModel() {
        return OpenAiEmbeddingModel.builder()
                .modelName(OpenAiEmbeddingModelName.TEXT_EMBEDDING_ADA_002)
                .build();
    }

    @Bean
    public EmbeddingStore<TextSegment> embeddingStore() {
        return new InMemoryEmbeddingStore<>();
    }
}


//    @Bean
//    public ChatMemoryProvider chatMemoryProvider(Tokenizer tokenizer) {
//        return chatId -> TokenWindowChatMemory.withMaxTokens(1000, tokenizer);
//    }