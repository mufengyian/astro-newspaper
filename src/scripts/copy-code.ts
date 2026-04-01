import { siteConfig } from "../config";
import { bindOnce, onPageLoad } from "./runtime";

function updateButtonState(button: HTMLButtonElement, label: string) {
	button.textContent = label;
	button.setAttribute("aria-label", label);
}

export function initCodeCopy() {
	const dictionaryNode = document.querySelector<HTMLElement>("[data-copy-i18n]");
	const idleLabel = dictionaryNode?.dataset.copyIdle || "Copy";
	const successLabel = dictionaryNode?.dataset.copySuccess || "Copied";
	const failureLabel = dictionaryNode?.dataset.copyFailure || "Error";

	document.querySelectorAll("pre").forEach((block) => {
		if (!(block instanceof HTMLElement) || block.dataset.copyReady === "true") {
			return;
		}

		const code = block.querySelector("code");
		if (!code) {
			return;
		}

		block.dataset.copyReady = "true";
		const button = document.createElement("button");
		button.type = "button";
		button.className = "copy-button";
		updateButtonState(button, idleLabel);

		button.addEventListener("click", async () => {
			try {
				await navigator.clipboard.writeText(code.textContent || "");
				updateButtonState(button, successLabel);
			} catch (error) {
				console.error("[newspaper] Failed to copy code block.", error);
				updateButtonState(button, failureLabel);
			} finally {
				window.setTimeout(() => {
					updateButtonState(button, idleLabel);
				}, siteConfig.interactions.copyFeedbackDurationMs);
			}
		});

		block.append(button);
	});
}

export function mountCodeCopy() {
	bindOnce("__newspaperCopyCodeBound", () => {
		onPageLoad(initCodeCopy);
	});
}
