# Terra One Coding Challenge for System Engineers

## Infrastructure changes

### Redis
- I've introduced in-memory data storage (Redis) to keep the state of trade messages allowing calculation service to horizontally scale without losing state. This allows us to handle trade messages in a distributed manner while ensuring that all messages are processed.
- I've also chosen Redis time series to store trade messages and do sum aggregation on it to have the max performance and scalability.
- It's also used in caching PnLs with TTL to increase API performance and reduce load on mongodb database.

## System diagram

![Untitled Diagram drawio](https://github.com/user-attachments/assets/d642dd6d-b49f-4d8f-ba3e-5d8d284ab3d8)

## Setup

1. Clone the repository
2. Run `npm start` to start all services including kafka setup (topics creation)
3. Open the frontend in your browser at `http://localhost:3000`

## Assumptions

- We really care about consistency, so we handle market message with a configurable* grace period so we can ensure all trade messages are processed by then. Given also that the interval of sending PnL stream is 10 seconds, so it's not a problem to wait for a few seconds.
- Returned PnLs to the frontend are caped to a certain configurable* number of records and not having it infinite.
- Calculation service is designed to be stateless, so it can be scaled horizontally without losing state. Number of instances can is configurable* with respect to the number of partitions in trades topic.
- PnL calculation is the subtraction of sellPrice * sellVolume - buyPrice * buyVolume.

*Configurable values are stored in env variables in docker-compose.yml file.
